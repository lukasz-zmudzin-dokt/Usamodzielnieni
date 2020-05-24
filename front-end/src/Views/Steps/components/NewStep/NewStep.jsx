import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { FormGroup } from "components";
import { staffTypes } from "constants/staffTypes";
import { sendNewStep } from "./functions/sendNewStep";

const NewStep = ({ steps, show, handleClose }) => {
  const stepsTypes = ["Krok główny", "Podkrok"];
  const [type, setType] = useState(stepsTypes[0]);
  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    video: "",
    parent: steps.children[0].title,
  });
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      let res;
      const object = steps.children.find(
        (item) => item.title === newStep.parent
      );
      const data = {
        ...newStep,
        parent: object.id,
      };
      try {
        res = await sendNewStep(user.token, isStep, data);
        alertC.current.showAlert(res.message, "success");
        handleClose();
      } catch (e) {
        alertC.current.showAlert(Object.values(e)[0]);
      }
    }
    setValidated(true);
  };

  const isStep = type === stepsTypes[0];

  return (
    <Modal show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header as="h2" closeButton>
          <Modal.Title>Dodaj nowy {isStep ? "krok" : "podkrok"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup
            type="select"
            header="Rodzaj kroku"
            id="stepType"
            array={stepsTypes}
            required
            val={type}
            setVal={(val) => {
              setType(val);
              setValidated(false);
            }}
          />
          <FormGroup
            type="select"
            header={`${
              isStep ? "Wybierz krok poprzedzający" : "Wybierz rodzica podkroku"
            } `}
            id="stepParent"
            required
            array={steps.children.map((item) => item.title)}
            val={newStep.parent}
            setVal={(val) =>
              setNewStep({
                ...newStep,
                parent: val,
              })
            }
          />
          <FormGroup
            header={`Tytuł ${isStep ? "kroku." : "podkroku."}`}
            setVal={(val) => setNewStep({ ...newStep, title: val })}
            val={newStep.title || ""}
            incorrect={`Podaj tytuł ${isStep ? "kroku." : "podkroku."}`}
            length={{ min: 1, max: 50 }}
            id="stepTitlee"
            required
          />
          <FormGroup
            type="text"
            header="Film (link youtube)"
            id="stepVideo"
            val={newStep.video || ""}
            setVal={(val) =>
              setNewStep({
                ...newStep,
                video: val,
              })
            }
          />
          {isStep ? (
            <FormGroup
              type="textarea"
              header="Opis kroku"
              id="stepDescription"
              required
              incorrect="Podaj opis kroku."
              val={newStep.description}
              setVal={(val) =>
                setNewStep({
                  ...newStep,
                  description: val,
                })
              }
            />
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">
            {isStep ? "Dodaj krok" : "Dodaj podkrok"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewStep;

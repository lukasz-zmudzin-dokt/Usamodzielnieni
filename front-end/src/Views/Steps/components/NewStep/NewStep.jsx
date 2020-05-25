import React, { useState, useContext, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { sendNewStep } from "./functions/sendNewStep";
import { StepsForm } from "../";
import { useEffect } from "react";

const NewStep = ({ steps, show, handleClose, root }) => {
  const stepsTypes = ["Krok główny", "Podkrok"];
  const [type, setType] = useState(stepsTypes[0]);
  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    video: "",
    parent: steps[0]?.title,
  });
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const [validated, setValidated] = useState(false);
  console.log(newStep);

  useEffect(() => {
    setNewStep({
      title: "",
      description: "",
      video: "",
      parent: steps[0]?.title,
    });
  }, [steps]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      let res;
      const object = steps.find(
        (item) => item.title === newStep.parent
      );
//      console.log(newStep);
      let data = {};
      if(object) {
        data = {
          ...newStep,
          parent: object.id,
        };
      } else {
        data = {
          ...newStep,
          parent: root.id,
        };
      }
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
          <StepsForm
            newStep={newStep}
            setNewStep={setNewStep}
            type={type}
            setType={setType}
            steps={steps}
            setValidated={setValidated}
            root={root}
          />
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

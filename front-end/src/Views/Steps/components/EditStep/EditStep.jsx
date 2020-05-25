import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { StepsForm } from "../";
import { editStep } from "./functions/editStep";

const EditStep = ({ step, steps, show, handleClose }) => {
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

  useEffect(() => {
    setNewStep(step);
  }, [step]);

  const isStep = type === stepsTypes[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      let res;
      console.log(newStep);
      const object = steps.children.find((item) => {
        console.log(item.title, newStep.parent);
        return item.title === newStep.parent;
      });
      const data = {
        ...newStep,
        parent: object.id,
      };
      try {
        res = await editStep(user.token, isStep, data, step.id);
        alertC.current.showAlert(res.message, "success");
        handleClose();
      } catch (e) {
        alertC.current.showAlert(Object.values(e)[0]);
      }
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form validated={validated} noValidate onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj krok</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StepsForm
            newStep={newStep}
            setNewStep={setNewStep}
            type={type}
            setType={setType}
            steps={steps}
            setValidated={setValidated}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Prześlij zmiany</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditStep;

//  {
//    newStep.next.map((val, i) => (
//      <FormGroup
//        type="text"
//        header={`Zmień zawartość przycisku ${i + 1}`}
//        id={`next${i + 1}_change`}
//        required
//        val={newStep.next[i]}
//        setVal={(val) =>
//          setNewStep({
//            ...newStep,
//            next: [val, newStep.next[i]],
//          })
//        }
//      />
//    ));
//  }

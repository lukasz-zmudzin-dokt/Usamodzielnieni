import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { StepsForm } from "../";
import { editStep } from "./functions/editStep";
import { loadSteps } from "Views/Steps/functions/loadSteps";

const EditStep = ({
  step,
  steps,
  show,
  handleClose,
  setSteps,
  setPath,
  setRoot,
  setError,
  root,
}) => {
  const stepsTypes = ["Krok główny", "Podkrok"];
  const [type, setType] = useState();
  const [newStep, setNewStep] = useState();
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const [validated, setValidated] = useState(false);
  console.log(step);

  useEffect(() => {
    console.log(root);
    if (step?.type === "main") {
      setNewStep({
        title: step?.title,
        description: step?.description,
        video: step?.video
          ? "https://www.youtube.com/watch?v=" + step.video
          : "",
      });
    } else {
      setNewStep({
        title: step?.title,
        description: step?.description,
        video: step?.video
          ? "https://www.youtube.com/watch?v=" + step.video
          : "",
      });
    }
    setType(step?.type === "main" ? stepsTypes[0] : stepsTypes[1]);
  }, [step]);

  const isStep = type === stepsTypes[0];
  console.log(isStep);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      let res;
      const data = {
        ...newStep,
      };
      try {
        res = await editStep(user.token, isStep, data, step.id);
        alertC.current.showAlert("Pomyślnie zmieniono krok.", "success");
        handleClose();
        await loadSteps(setSteps, setPath, setRoot, setError);
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
            isEdit={true}
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

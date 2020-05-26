import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { StepsForm } from "../";
import { editStep } from "./functions/editStep";
import { loadSteps } from "Views/Steps/functions/loadSteps";
import { roundToNearestMinutes } from "date-fns/esm";

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
  const [type, setType] = useState(
    step?.type === "main" ? stepsTypes[0] : stepsTypes[1]
  );
  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    video: "",
    parent: steps[0]?.title,
  });
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const [validated, setValidated] = useState(false);
  console.log(step);
  useEffect(() => {
    console.log(root);
    setNewStep({
      title: step?.title,
      description: step?.description,
      video: "",
      parent:
        steps.find(
          (s) => s.type === "main" && s.next.map((n) => n.id).includes(step?.id)
        )?.id || root?.id,
    });
    setType(step?.type === "main" ? stepsTypes[0] : stepsTypes[1]);
  }, [step]);

  const isStep = type === stepsTypes[0];
  console.log(isStep);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      let res;
      //const object = steps.find((item) => item.title === newStep.parent);
      const data = {
        ...newStep,
        //parent: object.id,
      };
      try {
        res = await editStep(user.token, isStep, data, step.id);
        alertC.current.showAlert(res.message, "success");
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

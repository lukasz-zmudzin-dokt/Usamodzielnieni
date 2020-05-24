import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Modal,
  Col,
  Row,
} from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { FormGroup } from "components";
import { staffTypes } from "constants/staffTypes";

const NewStep = ({ steps, show, handleClose }) => {
  const stepsTypes = ["Krok główny", "Podkrok"];

  const [newStep, setNewStep] = useState({
    type: stepsTypes[0],
  });
  const [buttonVal, setButtonVal] = useState("");
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
    }
    setValidated(true);
  };

  const addNewButton = (e) => {
    if (
      newStep.next.findIndex((item) => item === buttonVal) &&
      buttonVal !== ""
    ) {
      setNewStep({
        ...newStep,
        next: [...newStep.next, buttonVal],
      });
      setButtonVal("");
    } else {
      alertC.current.showAlert(
        "Dodaj treść przycisku bądź sprawdź czy taki przycisk już istnieje."
      );
    }
  };

  const deleteButton = (val) => {
    const index = newStep.next.findIndex((item) => item === val);
    const newArr = newStep.next;
    newArr.splice(index, 1);
    setNewStep({ ...newStep, next: newArr });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header as="h2" closeButton>
          <Modal.Title>Dodaj nowy krok</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup
            type="select"
            header="Rodzaj kroku"
            id="stepType"
            array={stepsTypes}
            required
            val={newStep.type}
            setVal={(val) => setNewStep({ ...newStep, type: val })}
          />

          <Button onClick={addNewButton}>Dodaj przycisk</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Dodaj krok</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewStep;

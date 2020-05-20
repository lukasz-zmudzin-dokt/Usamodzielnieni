import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Card, Container, Form, Modal, Col } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { FormGroup } from "components";

const NewStep = ({ id, show, handleClose }) => {
  const [newStep, setNewStep] = useState({
    title: "",
    value: "",
    next: [],
  });
  const [buttonVal, setButtonVal] = useState("");
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const [validatedBtn, setValidatedBtn] = useState(false);
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
            type="text"
            header="Dodaj tytuł"
            id="stepTitle"
            required
            val={newStep.title}
            setVal={(val) => setNewStep({ ...newStep, title: val })}
            incorrect="Krok musi mieć tytuł."
          />
          <FormGroup
            type="textarea"
            header="Dodaj zawartość kroku"
            id="stepValue"
            required
            val={newStep.value}
            setVal={(val) => setNewStep({ ...newStep, value: val })}
          />
          <Col className="p-0 mb-3">
            <p>Lista przycisków:</p>
            {newStep.next.map((val) => (
              <>
                <p>{val}</p>
                <Button onClick={() => deleteButton(val)} variant="danger">
                  Usuń
                </Button>
              </>
            ))}
            <FormGroup
              type="text"
              header={`Dodaj ${newStep.next.length + 1} przycisk `}
              id={`next${newStep.length}_change`}
              val={buttonVal}
              setVal={(val) => setButtonVal(val)}
            />

            <Button onClick={addNewButton}>Dodaj przycisk</Button>
          </Col>
          <Button type="submit">Prześlij zmiany</Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default NewStep;

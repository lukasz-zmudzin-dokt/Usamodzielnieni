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

const NewStep = ({ steps, show, handleClose }) => {
  const [newStep, setNewStep] = useState({
    title: "",
    value: "",
    place: "Przed",
    type: "Podkrok",
    next: [],
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
            header="Ma się pojawić ..."
            id="stepType"
            array={["Przed", "Po"]}
            required
            val={newStep.place}
            setVal={(val) => setNewStep({ ...newStep, place: val })}
          />
          <FormGroup
            type="select"
            header={newStep.place === "Przed" ? "Krokiem..." : "Kroku..."}
            id="stepType"
            array={[...steps.map((item) => item.title)]}
            required
            val={newStep.type}
            setVal={(val) => setNewStep({ ...newStep, type: val })}
          />
          <FormGroup
            type="select"
            header="Wybierz rodzaj kroku"
            id="stepType"
            array={["Podkrok", "Krok główny"]}
            required
            val={newStep.type}
            setVal={(val) => setNewStep({ ...newStep, type: val })}
          />
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
              <Row className="mr-0 ml-0 mb-3 align-items-center">
                <p className="font-weight-bold mb-0 mr-3">{val}</p>
                <Button onClick={() => deleteButton(val)} variant="danger">
                  Usuń
                </Button>
              </Row>
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
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Dodaj krok</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewStep;

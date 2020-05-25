import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { FormGroup } from "components";

const EditStep = ({ step, show, handleClose }) => {
  const [newStep, setNewStep] = useState(step);
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const [buttonVal, setButtonVal] = useState("");
  useEffect(() => {
    setNewStep(step);
  }, [step]);
  const handleSubmit = () => {};

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
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj krok</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup
            type="text"
            header="Zmień tytuł"
            id="title_change"
            required
            val={newStep.title}
            setVal={(val) => setNewStep({ ...newStep, title: val })}
            incorrect="Krok musi mieć tytuł."
          />
          <FormGroup
            type="textarea"
            header="Zmień zawartość kroku"
            id="value_change"
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

          <Modal.Footer>
            <Button type="submit">Prześlij zmiany</Button>
          </Modal.Footer>
        </Modal.Body>
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

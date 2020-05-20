import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { FormGroup } from "components";

const EditStep = ({ step, show, handleClose }) => {
  const [newStep, setNewStep] = useState(step);
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));

  const handleSubmit = () => {};

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <FormGroup
            type="text"
            header="Zmień tytuł"
            id="title_change"
            required
            val={newStep.title}
            setVal={(val) => setNewStep({ ...newStep, title: val })}
            incorrect="Krok musi mieć tytuł."
          />
        </Modal.Header>
        <Modal.Body>
          <FormGroup
            type="textarea"
            header="Zmień zawartość kroku"
            id="value_change"
            required
            val={newStep.value}
            setVal={(val) => setNewStep({ ...newStep, value: val })}
          />
          {newStep.next.map((val, i) => (
            <FormGroup
              type="text"
              header={`Zmień zawartość przycisku ${i + 1}`}
              id={`next${i + 1}_change`}
              required
              val={newStep.next[i]}
              setVal={(val) =>
                setNewStep({
                  ...newStep,
                  next: [val, newStep.next[i]],
                })
              }
            />
          ))}
          <Modal.Footer>
            <Button onClick={handleClose}>Zamknij</Button>
            <Button type="submit">Prześlij zmiany</Button>
          </Modal.Footer>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default EditStep;

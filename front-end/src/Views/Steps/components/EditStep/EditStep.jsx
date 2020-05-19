import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { FormGroup } from "components";

const EditStep = ({ step }) => {
  const [newStep, setNewStep] = useState(step);
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));

  const handleSubmit = () => {};

  return (
    <Card className="stepInfo">
      <Form onSubmit={handleSubmit}>
        <Card.Header>
          <FormGroup
            type="text"
            header="Zmień tytuł"
            id="title_change"
            required
            val={newStep.title}
            setVal={(val) => setNewStep({ ...newStep, title: val })}
            incorrect="Krok musi mieć tytuł."
          />
        </Card.Header>
        <Card.Body>
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

          <Button type="submit">Prześlij zmiany</Button>
        </Card.Body>
      </Form>
    </Card>
  );
};

export default EditStep;

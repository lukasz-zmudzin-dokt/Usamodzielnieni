import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { AlertContext, UserContext } from "context";
import { FormGroup } from "components";

const EditStep = ({ step }) => {
  const [editedStep, setEditedStep] = useState(step);
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));

  return (
    <Card className="stepInfo">
      <Form>
        <Card.Header>
          <FormGroup
            type="text"
            header="Zmień tytuł"
            id="title_change"
            val={editedStep.title}
            setVal={(val) => setEditedStep({ ...editedStep, title: val })}
          />
        </Card.Header>
        <Card.Body>
          <FormGroup
            type="textarea"
            header="Zmień zawartość kroku"
            id="value_change"
            val={editedStep.value}
            setVal={(val) => setEditedStep({ ...editedStep, value: val })}
          />
          <FormGroup
            type="text"
            header="Zmień zawartość przycisku 1"
            id="next1_change"
            val={editedStep.next[0]}
            setVal={(val) =>
              setEditedStep({ ...editedStep, next: [val, editedStep.next[1]] })
            }
          />

          <FormGroup
            type="text"
            header="Zmień zawartość przycisku 2"
            val={editedStep.next[1]}
            id="next2_change"
            setVal={(val) =>
              setEditedStep({ ...editedStep, next: [editedStep.next[0], val] })
            }
          />
          <Button>Prześlij zmiany</Button>
        </Card.Body>
      </Form>
    </Card>
  );
};

export default EditStep;

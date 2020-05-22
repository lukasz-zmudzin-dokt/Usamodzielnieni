import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import Player from "components/Player";
import { UserContext } from "context";
import { userTypes } from "constants/userTypes";
const StepCard = ({ step, setCurrent, wantsDelete }) => {
  const user = useContext(UserContext);
  return (
    <Card className="stepCard">
      <Card.Body>
        <div>
          <Player src={step.video} />
        </div>
        <Card.Text as="h4" text-muted="true">
          Opis kroku:
        </Card.Text>
        {step.description}
        <Card.Text className="mt-3" as="h4" text-muted="true">
          Akcje:
        </Card.Text>
        {step.next?.map((child) => (
          <Button
            variant="primary"
            block
            key={child.id}
            onClick={(e) => setCurrent(child.id)}
          >
            {child.choiceName}
          </Button>
        ))}
      </Card.Body>
      {user.type === userTypes.STAFF ? (
        <Button variant="danger" onClick={() => wantsDelete(true)}>
          Usuń krok
        </Button>
      ) : null}
    </Card>
  );
};

export default StepCard;

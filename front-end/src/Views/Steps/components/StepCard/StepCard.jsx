import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import Player from "components/Player";
import { UserContext } from "context";
import { staffTypes } from "constants/staffTypes";

const StepCard = ({ step, setCurrent, wantsDelete, wantsEdit, path }) => {
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
        {((step.next && step.next.length > 0) || step.id === path[path.length - 1]) && 
          <Card.Text className="mt-3" as="h4" text-muted="true">
            Akcje:
          </Card.Text>
        }
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
        {path[path.length - 1] === step.id && (
          <Button
            variant="secondary"
            block
            onClick={(e) => {
              setCurrent(path[0]);
              window.scrollTo(0, 0);
            }}
          >
            Początek
          </Button>
        )}
        {path[path.length - 1] === step.id &&
        user.data.group_type?.includes(staffTypes.BLOG_MODERATOR) ? (
          <Button variant="warning" block onClick={() => wantsEdit(true)}>
            Edytuj krok
          </Button>
        ) : null}
        {path[path.length - 1] === step.id &&
        user.data.group_type?.includes(staffTypes.BLOG_MODERATOR) ? (
          <Button variant="danger" block onClick={() => wantsDelete(true)}>
            Usuń krok
          </Button>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default StepCard;

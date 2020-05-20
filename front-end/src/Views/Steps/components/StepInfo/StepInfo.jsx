import React from "react";
import { Card, Button } from "react-bootstrap";

const StepInfo = ({ step, setCurrent }) => {
  return (
    <Card className="stepInfo">
      <Card.Body>
        <p>{step.value}</p>
        {step.next?.map((nextStep) => (
          <Button
            className="mr-2"
            key={nextStep}
            variant="primary"
            onClick={() => setCurrent(nextStep)}
          >
            {nextStep}
          </Button>
        ))}
      </Card.Body>
    </Card>
  );
};

export default StepInfo;

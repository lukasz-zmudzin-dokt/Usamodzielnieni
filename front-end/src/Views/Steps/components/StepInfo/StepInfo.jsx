import React from 'react';
import { Card, Button } from 'react-bootstrap';

const StepInfo = ({ step }) => {
    return (
        <Card className="stepInfo">
            <Card.Body>
                <p>{step.value}</p>
                {step.next.map(nextStep => <Button variant="primary">{nextStep}</Button>)}
            </Card.Body>
        </Card>
    )
}

export default StepInfo

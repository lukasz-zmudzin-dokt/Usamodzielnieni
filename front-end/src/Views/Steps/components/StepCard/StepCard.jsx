import React from "react";
import {Button, Card, Container} from "react-bootstrap";
import {Player} from "components/Player/Player";

const StepCard = ({step, setCurrent}) => {

    return (
        <Container>
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-center">
                        <Player src={step.video} />
                    </div>
                    <div>
                        <Card.Text as="h4" text-muted="true">Opis kroku:</Card.Text>
                        {step.description}
                    </div>
                    <Card.Text>Akcje:</Card.Text>
                    {step.next.map(child => (
                        <Button variant="primary" block key={child.id} onClick={e => setCurrent(child.id)}>{child.choiceName}</Button>
                    ))}
                </Card.Body>
            </Card>
        </Container>
    )
};

export default StepCard;
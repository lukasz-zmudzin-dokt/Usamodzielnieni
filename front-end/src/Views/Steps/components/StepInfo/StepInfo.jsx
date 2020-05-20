import React from 'react';
import { Card, Button } from 'react-bootstrap';

const StepInfo = ({ step, setCurrent, steps, setSteps }) => {
    
    const deleteStep = () => {

    };

    const findParents = () => {
        let parents = [];
        steps.forEach(element => {
            if(element.next && element.next.includes(step.id)) {
                parents.push(element);
            }
        });

        return parents;
    };

    //console.log(findParents());
    console.log(step);

    return (
        <Card className="stepInfo">
            <Card.Body>
                <p>{step.value}</p>
                {step.next?.map(nextStep => (
                    <Button
                        className="mr-2"
                        key={nextStep}
                        variant="primary"
                        onClick={() => setCurrent(nextStep)}>
                            {nextStep}
                    </Button>
                ))}
            </Card.Body>
            <Button variant="danger" onClick={() => deleteStep()}>Usuń krok</Button>
        </Card>
    )
}

export default StepInfo

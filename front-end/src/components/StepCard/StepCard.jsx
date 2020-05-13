import React, {useEffect, useState} from "react";
import proxy from "config/api";
import {Alert, Button, Card, Container} from "react-bootstrap";
import YouTube from "react-youtube";

const getCardContent = async (token, id) => {
    const url = proxy.steps + id + "/";
    const headers = {
        Authorization: "Token " + token,
        "Content-type": "application/json"
    };
    const response = await fetch(url, {method: "GET", headers});

    if (response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};

const StepCard = ({stepId, token}) => {
    const [id, setId] = useState(stepId);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [content, setContent] = useState({});

    useEffect(() => {
        const loadCard = async (token) => {
            setError(false);
            setLoading(true);
            setDisabled(true);
            try {
                const res = await getCardContent(token, id);
                setContent(mapContent(res));
            } catch(e) {
                setError(true);
            } finally {
                setLoading(false);
                setDisabled(false);
            }
        };
        loadCard(token)
    }, [token, id]);

    const mapContent = (data) => ({
        id: data.id,
        title: data.title,
        video: data.video,
        description: data.description,
        type: data.type,
        nextSteps: mapSteps(data.next_steps)
    });

    const mapSteps = (steps) => {
        return steps.map(child => ({
            id: child.id,
            title: child.choice_name
        }))
    };

    const videoProps = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1
        }
    };

    const msg = error ? <Alert variant="danger">Wystąpił błąd podczas ładowania kroku</Alert> :
                loading ? <Alert variant="info">Ładowanie kroku</Alert> :
                undefined;


    return (
        <Container>
            <Card>
                <Card.Header>{content.title}</Card.Header>
                {msg ? <Card.Body>{msg}</Card.Body> : (
                    <Card.Body>
                        <YouTube className="mb-3" videoId={content.video || "dQw4w9WgXcQ"} opts={videoProps} onReady={this._onReady} />
                        <div>
                            <Card.Text>Opis kroku:</Card.Text>
                            {content.description}
                        </div>
                        <Card.Text>Akcje:</Card.Text>
                        {content.nextSteps.map(step => (
                            <Button variant="primary" block key={step.id} onClick={e => setId(step.id)}>{disabled ? "Ładowanie..." : step.title}</Button>
                        ))}
                    </Card.Body>
                )}
            </Card>
        </Container>
    )
};

export default StepCard;
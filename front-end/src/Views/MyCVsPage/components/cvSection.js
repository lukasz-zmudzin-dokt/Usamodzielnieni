import {Alert, Button, Col, ListGroup, Row} from "react-bootstrap";
import CVStatus from "./CVStatus";
import {IndexLinkContainer} from "react-router-bootstrap";
import React, {useState} from "react";
import {getCVUrl} from "../functions/getCVUrl";
import proxy from "config/api";

const showCV = async (cvId, handleShowing, token) => {
    let r;
    try {
        r = await getCVUrl(token, cvId);
        let url = proxy.plain + r;
        window.open(url, '_blank');
    } catch(r) {
        handleShowing(true);
    }
};

const CVSection = ({cv, token, cutCV}) => {
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleDeletion = async () => {
        setDisabled(true);
        const res = await cutCV(cv.cv_id);
        if (res === false) {
            setDisabled(false);
        };
    };

    return (
        <ListGroup.Item key={cv.cv_id}>
            <Row className="d-flex align-items-center">
                <Col xs={12} md={5}>{cv.name}</Col>
                <Col xs={4} md={3}><CVStatus was_reviewed={cv.was_reviewed} is_verified={cv.is_verified} /></Col>
                <Col xs={8} md={4} className="text-right">
                    <Button variant="primary" onClick={e => showCV(cv.cv_id, setError, token)}>Zobacz CV</Button>
                    <IndexLinkContainer to={"/cvEditor/" + cv.cv_id}>
                        <Button variant="info" className="mx-2">Edytuj</Button>
                    </IndexLinkContainer>
                    <Button variant="danger" disabled={disabled} onClick={handleDeletion}>{disabled ? "..." : "Usuń CV"}</Button>
                </Col>
            </Row>
            {error ? <Alert variant="danger" className="m-3">
                Ups, coś poszło nie tak. Nie można wyświetlić CV.
            </Alert> : null}
        </ListGroup.Item>
    );

};

export default CVSection;
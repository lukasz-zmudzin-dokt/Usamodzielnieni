import React, { useState,useRef,useContext } from "react";
import {Button, Col, ListGroup, Row} from "react-bootstrap";
import CVStatus from "./CVStatus";
import {IndexLinkContainer} from "react-router-bootstrap";
import {getCVUrl} from "../functions/getCVUrl";
import proxy from "config/api";
import {AlertContext} from 'context';

const showCV = async (cvId, alertC, token) => {
    let r;
    try {
        r = await getCVUrl(token, cvId);
        let url = proxy.plain + r;
        window.open(url, '_blank');
    } catch(r) {
        alertC.current.showAlert("Ups, coś poszło nie tak. Nie można wyświetlić CV.")
    }
};

const CVSection = ({cv, token, cutCV}) => {
    const [disabled, setDisabled] = useState(false);
    const alertC = useRef(useContext(AlertContext));

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
                    <Button variant="primary" onClick={e => showCV(cv.cv_id, alertC, token)}>Zobacz CV</Button>
                    <IndexLinkContainer to={"/cvEditor/" + cv.cv_id}>
                        <Button variant="info" className="mx-2">Edytuj</Button>
                    </IndexLinkContainer>
                    <Button variant="danger" disabled={disabled} onClick={handleDeletion}>{disabled ? "..." : "Usuń CV"}</Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );

};

export default CVSection;
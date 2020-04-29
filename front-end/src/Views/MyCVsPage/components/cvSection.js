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

const CVSection = ({cv, token}) => {
    const [error, setError] = useState(false);

    return (
        <ListGroup.Item key={cv.cv_id}>
            {error ? <Alert variant="danger" className="m-3">
                Ups, coś poszło nie tak.
            </Alert> : null}
            <Row className="d-flex align-items-center">
                <Col xs={12} md={5}>{cv.name}</Col>
                <Col xs={4} md={3}><CVStatus was_reviewed={cv.was_reviewed} is_verified={cv.is_verified} /></Col>
                <Col xs={8} md={4} className="text-right">
                    <IndexLinkContainer to={"/cvEditor/" + cv.cv_id}>
                        <Button variant="info">Edytuj</Button>
                    </IndexLinkContainer>
                    <Button className="ml-2" variant="primary" onClick={e => showCV(cv.cv_id, setError, token)}>Zobacz CV</Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );

};

export default CVSection;
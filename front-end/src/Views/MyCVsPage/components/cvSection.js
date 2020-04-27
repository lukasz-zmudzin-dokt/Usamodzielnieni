import {Button, Col, ListGroup, Row} from "react-bootstrap";
import CVStatus from "./CVStatus";
import {IndexLinkContainer} from "react-router-bootstrap";
import React from "react";
import {getCVUrl} from "../functions/getCVUrl";

const showCV = async (cvId, handleShowing, token) => {
    let r;
    try {
        r = await getCVUrl(token, cvId);
        handleShowing({errors: {small: false}});
        let url = "https://usamo-back.herokuapp.com" + r;
        window.open(url, '_blank');
    } catch(r) {
        handleShowing({errors: {small: true}, errorMessages: {small: r}});
    }
};

const CVSection = ({cv, handleShowing, token}) => (
    <ListGroup.Item key={cv.cv_id}>
        <Row className="d-flex align-items-center">
            <Col xs={12} md={5}>{cv.name}</Col>
            <Col xs={4} md={3}><CVStatus was_reviewed={cv.was_reviewed} is_verified={cv.is_verified} /></Col>
            <Col xs={8} md={4} className="text-right">
                <IndexLinkContainer to={"/cvEditor/" + cv.cv_id}>
                    <Button variant="info">Edytuj</Button>
                </IndexLinkContainer>
                <Button className="ml-2" variant="primary" onClick={e => showCV(cv.cv_id, handleShowing, token)}>Zobacz CV</Button>
            </Col>
        </Row>
    </ListGroup.Item>
);

export default CVSection;
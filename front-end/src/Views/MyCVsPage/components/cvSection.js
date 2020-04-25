import {Button, Col, ListGroup, Row} from "react-bootstrap";
import CVStatus from "./CVStatus";
import {IndexLinkContainer} from "react-router-bootstrap";
import React from "react";

const CVSection = ({cv, showCV}) => (
    <ListGroup.Item key={cv.cv_id}>
        <Row className="d-flex align-items-center">
            <Col xs={12} md={5}>{cv.cv_id}</Col>
            <Col xs={4} md={3}><CVStatus was_reviewed={cv.was_reviewed} is_verified={cv.is_verified} /></Col>
            <Col xs={8} md={4} className="text-right">
                <IndexLinkContainer to={"/cvEditor/" + cv.cv_id}>
                    <Button variant="info">Edytuj</Button>
                </IndexLinkContainer>
                <Button className="ml-2" variant="primary" onClick={e => showCV(cv.cv_id)}>Zobacz CV</Button>
            </Col>
        </Row>
    </ListGroup.Item>
);

export default CVSection;
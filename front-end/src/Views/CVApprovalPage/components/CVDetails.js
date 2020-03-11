import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {acceptCV, downloadCV, improveCV} from "../functions/cvOperations";

const CVDetails = ({ cv })  => {
    return (
        <Row className="mt-3">
            <Col xs={6} md={2}>{cv.firstName}</Col>
            <Col xs={6} md={2}>{cv.lastName}</Col>
            <Col xs={12} md={4}>
                <a href={"mailto:" + cv.email}> {cv.email} </a>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-end">
                <Button variant="primary m-1 p-1" onClick={e => (downloadCV(e, cv.id))}>Pobierz</Button>
                <Button variant="success m-1 p-1" onClick={e => (acceptCV(e, cv.id))}>Akceptuj</Button>
                <Button variant="warning m-1 p-1" onClick={e => (improveCV(e, cv.id))}>Popraw</Button>
            </Col>
        </Row>
    );
};

export default CVDetails;
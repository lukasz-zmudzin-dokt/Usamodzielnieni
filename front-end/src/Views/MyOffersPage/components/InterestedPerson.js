import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { downloadCV } from "../functions/functions";

const InterestedPerson = ({ person })  => {
    return (
        <Row className="mt-3">
            <Col xs={6} md={3}>{person.firstName}</Col>
            <Col xs={6} md={3}>{person.lastName}</Col>
            <Col xs={12} md={4}>
                <a href={"mailto:" + person.email}> {person.email} </a>
            </Col>
            <Col xs={12} md={2}>
                <Button variant="primary m-1 p-1" onClick={downloadCV}>Zobacz CV</Button>
            </Col>
        </Row>
    );
};

export default InterestedPerson;
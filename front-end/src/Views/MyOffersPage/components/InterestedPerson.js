import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { downloadCV } from "Views/MyOffersPage/functions/functions";

const InterestedPerson = ({ person })  => {
    return (
        <Row className="mt-2">
            <Col xs={12} md={6}>{person.first_name} {person.last_name}</Col>
            <Col xs={12} md={4}>
                {person.email}
            </Col>
            <Col xs={12} md={2} className="d-flex justify-content-end">
                <Button variant="primary m-1 p-1" onClick={e => downloadCV(e, person.id)}>Zobacz CV</Button>
            </Col>
        </Row>
    );
};

export default InterestedPerson;
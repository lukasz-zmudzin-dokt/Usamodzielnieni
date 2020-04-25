import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const showCV = (cvUrl) => {
    let url = "http://usamo-back.herokuapp.com" + cvUrl;
    window.open(url, '_blank');
};

const InterestedPerson = ({ person })  => {
    return (
        <Row className="mt-3">
            <Col xs={12} md={6} className="d-flex align-items-center">{person.first_name} {person.last_name}</Col>
            <Col xs={12} md={4} className="d-flex align-items-center">
                {person.email}
            </Col>
            <Col xs={12} md={2} className="d-flex justify-content-end">
                <Button variant="primary m-1 p-1" onClick={e => showCV(person.cv_url)}>Zobacz CV</Button>
            </Col>
        </Row>
    );
};

export default InterestedPerson;
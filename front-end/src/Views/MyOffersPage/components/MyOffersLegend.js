import React from "react";
import {Col, Row} from "react-bootstrap";

const MyOffersLegend = ({ answers = [] })  => {
    if(answers.length > 0) {
        return (
            <Row className="mt-3">
                <Col xs={6} md={3}><b>Imię</b></Col>
                <Col xs={6} md={3}><b>Nazwisko</b></Col>
                <Col xs={12} md={4}><b>Email</b></Col>
                <Col xs={12} md={2}><b>CV</b></Col>
            </Row>
        );
    } else {
        return null;
    }
};

export default MyOffersLegend;
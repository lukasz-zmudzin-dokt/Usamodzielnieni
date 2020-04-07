import React from "react";
import {Col, Row} from "react-bootstrap";
import "Views/MyOffersPage/style.css";

const MyOffersLegend = ({ answers = [] })  => {
    if(answers.length > 0) {
        return (
            <Row className="mb-3 hide-on-mobile">
                <Col xs={12} md={6}><b>Imię i nazwisko</b></Col>
                <Col xs={12} md={6}><b>Email</b></Col>
            </Row>
        );
    } else {
        return null;
    }
};

export default MyOffersLegend;
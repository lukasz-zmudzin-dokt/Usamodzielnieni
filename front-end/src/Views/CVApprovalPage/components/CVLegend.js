import React from "react";
import {Col, Row} from "react-bootstrap";

const CVLegend = ()  => {
    return (
        <Row className="cv_legend">
            <Col md={3} xs={12}><b>Imię i nazwisko</b></Col>
            <Col md={4} xs={12}><b>Email</b></Col>
            <Col md={5} xs={8}/>
        </Row>
    );
};

export default CVLegend;
import React from "react";
import {Col, Row} from "react-bootstrap";

const CVLegend = ({ cvs })  => {
    if(cvs.length > 0) {
        return (
            <Row className="cv_legend mb-4">
                <Col md={2} xs={6}><b>Imię</b></Col>
                <Col md={2} xs={6}><b>Nazwisko</b></Col>
                <Col md={4} xs={12}><b>Email</b></Col>
                <Col md={4} xs={8}/>
            </Row>
        );
    } else {
        return null;
    }
};

export default CVLegend;
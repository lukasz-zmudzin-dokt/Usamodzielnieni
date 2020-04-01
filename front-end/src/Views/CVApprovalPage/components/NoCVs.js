import React from "react";
import {Col, Row} from "react-bootstrap";

const NoCVs = ({ cvs })  => {
    if(cvs !== undefined) {
        if (cvs.length === 0) {
            return (
                <Row className="cv_legend mb-4">
                    <Col>Brak CV do zatwierdzenia</Col>
                </Row>
            );
        } else {
            return null;
        }
    } else {
            return (
                <Row className="cv_legend mb-4">
                    <Col>Brak CV do zatwierdzenia</Col>
                </Row>
            );
    }
};

export default NoCVs;
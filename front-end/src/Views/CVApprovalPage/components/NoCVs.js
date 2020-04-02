import React from "react";
import {Col, Row} from "react-bootstrap";

const NoCVs = ({ cvs })  => {
    if (cvs.length === 0) {
        return (
            <Row className="cv_legend mb-4 text-center">
                <Col>Brak CV do zatwierdzenia</Col>
            </Row>
        );
    } else {
        return null;
    }
};

export default NoCVs;
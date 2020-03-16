import React from "react";
import {Row} from "react-bootstrap";

const NoInterest = ({ answers })  => {
    if(answers === undefined) {
        return (
            <Row className="ml-1">Brak chętnych</Row>
        );
    } else {
        if(answers.length === 0) {
            return (
                <Row className="ml-1">Brak chętnych</Row>
            );
        } else {
            return null;
        }
    }
};

export default NoInterest;
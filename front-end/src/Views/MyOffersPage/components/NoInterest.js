import React from "react";
import {Row} from "react-bootstrap";

const NoInterest = ({ answers })  => {
    if(answers === undefined) {
        return (
            <Row className="ml-1">Do tego ogłoszenia nie zgłosił się jeszcze nikt chętny.</Row>
        );
    } else {
        if(answers.length === 0) {
            return (
                <Row className="ml-1">Do tego ogłoszenia nie zgłosił się jeszcze nikt chętny.</Row>
            );
        } else {
            return null;
        }
    }
};

export default NoInterest;
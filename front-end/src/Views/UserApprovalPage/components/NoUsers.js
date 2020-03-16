import React from "react";
import {Col, Row} from "react-bootstrap";

const NoUsers = ({ users })  => {
    if(users.length === 0) {
        return (
            <Row className=" mb-4">
                <Col>Brak Użytkowników do zatwierdzenia</Col>
            </Row>
        );
    } else {
        return null;
    }
};

export default NoUsers;
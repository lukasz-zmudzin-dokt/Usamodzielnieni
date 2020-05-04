import React from "react";
import {Row, Col, Alert} from "react-bootstrap";
import UserIcon from "../UserIcon";

const UserBasicInfo = ({user, names, error}) => {
    const { firstName, lastName } = user;
    const { role } = names;
    return (
        <Row className="text-center text-sm-left">
            <Col xs="12" sm="auto">
                <UserIcon />
            </Col>
            <Col>
                <div>
                    {error ? <Alert variant="danger">Wystąpił błąd podcas pobierania danych</Alert> : <h5>{`${firstName} ${lastName}`}</h5>}
                </div>
                <div>{role[role]}</div>
            </Col>
        </Row>
    );
};

export default UserBasicInfo;
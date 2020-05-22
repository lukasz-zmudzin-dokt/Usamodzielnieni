import React from "react";
import { Row, Col } from "react-bootstrap";
import { UserIcon, PhotoButtonsContainer } from "../";

const UserBasicInfo = ({ user, names }) => {
  const { firstName, lastName } = user;
  const { role } = names;
  return (
    <Col>
      <Row className="text-center text-sm-left">
        <Col xs="12" sm="auto">
          <Row className="justify-content-center mb-2">
            <UserIcon />
          </Row>
          <Row className="justify-content-center mb-3 mb-sm-0">
            <PhotoButtonsContainer />
          </Row>
        </Col>
        <Col>
          <div>
            <h5>{`${firstName} ${lastName}`}</h5>
          </div>
          <div>{role[role]}</div>
        </Col>
      </Row>
    </Col>
  );
};

export default UserBasicInfo;

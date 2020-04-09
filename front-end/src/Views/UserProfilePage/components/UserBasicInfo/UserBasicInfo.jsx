import React from "react";
import { Row, Col } from "react-bootstrap";
import UserIcon from "Views/UserProfilePage/components/UserIcon";

const UserBasicInfo = props => {
  const { firstName, lastName } = props.user;
  const { role } = props.names;
  return (
    <Row className="text-center text-sm-left">
      <Col xs="12" sm="auto">
        <UserIcon />
      </Col>
      <Col>
        <div>
          <h5>{`${firstName} ${lastName}`}</h5>
        </div>
        <div>{role[role]}</div>
      </Col>
    </Row>
  );
};

export default UserBasicInfo;
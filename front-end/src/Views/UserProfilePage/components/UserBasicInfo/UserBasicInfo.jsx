import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { PhotoButtonsContainer } from "../";
import { UserPicture } from "components";
import { UserContext } from "context";

const UserBasicInfo = ({ user, names }) => {
  const { firstName, lastName } = user;
  const { role } = names;

  const userContext = useContext(UserContext);

  return (
    <Col>
      <Row className="text-center text-sm-left">
        <Col xs="12" sm="auto">
          <Row className="justify-content-center">
            <h3>
              <UserPicture user={userContext} />
            </h3>
          </Row>
          <Row className="justify-content-center mb-3 mb-sm-0">
            <PhotoButtonsContainer user={userContext} />
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

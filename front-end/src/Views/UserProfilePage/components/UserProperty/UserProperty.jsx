import React from "react";
import { Row, Col, ListGroupItem } from "react-bootstrap";

const UserProperty = props => {
  const { names, property, user } = props;
  return (
    <ListGroupItem className="property">
      <Row>
        <Col xs="12" sm="auto">
          <div className="property__title">{names.property[property]}:</div>
        </Col>
        <Col>{user[property]}</Col>
      </Row>
    </ListGroupItem>
  );
};
export default UserProperty;

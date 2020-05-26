import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const Contact = ({ contact }) => {
  return (
    <div>
      <Row>
        <Col>
          <h5>{contact.first_name}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>{contact.last_name}</h5>
        </Col>
        <Col>
          <IndexLinkContainer to={`/chats/${contact.username}`}>
            <Button className="float-right">→</Button>
          </IndexLinkContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <em>{contact.role}</em>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;

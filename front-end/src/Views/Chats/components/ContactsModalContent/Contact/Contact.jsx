import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { UserPicture } from "components";

const Contact = ({ contact }) => {
  console.log(contact);

  return (
    <div>
      <Row className="align-items-center">
        <div className="align-self-start">
          <UserPicture user={contact} />
        </div>
        <Col>
          <h5>{contact.data.first_name}</h5>
          <h5>{contact.data.last_name}</h5>
          <em>{contact.data.role}</em>
        </Col>
        <IndexLinkContainer to={`/chats/${contact.data.username}`}>
          <Button className="float-right">→</Button>
        </IndexLinkContainer>
      </Row>
    </div>
  );
};

export default Contact;

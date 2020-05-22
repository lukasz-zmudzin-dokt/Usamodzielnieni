import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const Contact = ({ first_name, id }) => {
  return (
    <Row>
      <Col>
        <h5>{first_name}</h5>
      </Col>
      <Col>
        <IndexLinkContainer to={`/chats/${id}`}>
          <Button>Nowa wiadomość</Button>
        </IndexLinkContainer>
      </Col>
    </Row>
  );
};

export default Contact;

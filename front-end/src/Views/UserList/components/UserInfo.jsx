import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import DetailsItem from "components/DetailsItem/DetailsItem";

const formatDate = (dateString) => {
  const joined = new Date(dateString);
  return (
    joined.getDate() + "-" + (joined.getMonth() + 1) + -+joined.getFullYear()
  );
};

const UserInfo = ({ user, ...rest }) => (
  <Row {...rest}>
    <Col>
      <h5>{user.username}</h5>
      <Row>
        <DetailsItem md="4" xl="3" label="Adres email">
          {user.email}
        </DetailsItem>
        <DetailsItem md="4" xl="3" label="Typ">
          {user.type}
        </DetailsItem>
        <DetailsItem md="4" xl="3" label="Data rejestracji">
          {formatDate(user.dateJoined)}
        </DetailsItem>
        <DetailsItem md="4" xl="3" label="Status">
          {user.status}
        </DetailsItem>
      </Row>
      <IndexLinkContainer to={`/chats/${user.id}`}>
        <Button>Wyślij wiadomość</Button>
      </IndexLinkContainer>
    </Col>
  </Row>
);

export default UserInfo;

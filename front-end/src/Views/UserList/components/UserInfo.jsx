import React from "react";
import { Col, Row } from "react-bootstrap";
import DetailsItem from "components/DetailsItem/DetailsItem";
import ButtonsContainer from "./ButtonsContainer";

const formatDate = (dateString) => {
  const joined = new Date(dateString);
  return (
    joined.getDate() + "-" + (joined.getMonth() + 1) + -+joined.getFullYear()
  );
};

const UserInfo = ({ user, mapType, mapStatus, ...rest }) => (
  <Row {...rest}>
    <Col>
      <h5>{user.username}</h5>
      <Row>
        <DetailsItem md="4" xl="3" label="Adres email">
          {user.email}
        </DetailsItem>
        <DetailsItem md="4" xl="3" label="Typ">
          {mapType(user.type)}
        </DetailsItem>
        <DetailsItem md="4" xl="3" label="Data rejestracji">
          {formatDate(user.dateJoined)}
        </DetailsItem>
        <DetailsItem md="4" xl="3" label="Status">
          {mapStatus(user.status)}
        </DetailsItem>
      </Row>
      <ButtonsContainer user={user} />
    </Col>
  </Row>
);

export default UserInfo;

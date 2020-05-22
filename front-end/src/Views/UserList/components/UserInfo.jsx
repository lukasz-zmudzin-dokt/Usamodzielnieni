import React from "react";
import { Col, Row } from "react-bootstrap";
import DetailsItem from "components/DetailsItem/DetailsItem";
import ButtonsContainer from "./ButtonsContainer";

const UserInfo = ({
  user,
  setUser,
  deleteUser,
  mapType,
  mapStatus,
  ...rest
}) => (
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
          {user.dateJoined.toLocaleDateString?.()}
        </DetailsItem>
        <DetailsItem md="4" xl="3" label="Status">
          {mapStatus(user.status)}
        </DetailsItem>
      </Row>
      <ButtonsContainer user={user} setUser={setUser} deleteUser={deleteUser} />
    </Col>
  </Row>
);

export default UserInfo;

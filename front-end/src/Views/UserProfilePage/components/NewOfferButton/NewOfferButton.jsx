import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { userStatuses } from "constants/userStatuses";
import { userTypes } from "constants/userTypes";

const NewOfferButton = ({ user }) =>
  user.type === userTypes.EMPLOYER &&
  user.data &&
  user.data.status === userStatuses.VERIFIED ? (
    <LinkContainer to="/offerForm">
      <Button variant="primary">Stwórz nową ofertę</Button>
    </LinkContainer>
  ) : null;

export default NewOfferButton;

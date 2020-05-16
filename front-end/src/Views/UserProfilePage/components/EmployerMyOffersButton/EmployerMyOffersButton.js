import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import {userStatuses} from "constants/userStatuses";
import {userTypes} from "constants/userTypes";

const EmployerMyOffersButton = ({ user }) =>
  user.type === userTypes.EMPLOYER && user.data && user.data.status === userStatuses.VERIFIED ? (
    <LinkContainer to="/myOffers">
      <Button variant="primary">Zgłoszenia do moich ofert</Button>
    </LinkContainer>
  ) : null;

export default EmployerMyOffersButton;

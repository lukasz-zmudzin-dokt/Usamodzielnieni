import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { staffTypes } from "constants/staffTypes";
import { userTypes } from "constants/userTypes";

const AdminOfferApprovalButton = ({ user }) =>
  user.type === userTypes.STAFF &&
  user.data.group_type.includes(staffTypes.JOBS) ? (
    <LinkContainer className="my-2" to="/offerApproval">
      <Button variant="primary">Akceptuj oferty pracy</Button>
    </LinkContainer>
  ) : null;

export default AdminOfferApprovalButton;

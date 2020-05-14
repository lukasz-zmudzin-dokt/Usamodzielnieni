import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { staffTypes } from "constants/staffTypes";

const AdminApproveUserButton = ({ user }) =>
  user.type === "Staff" &&
  user.data.group_type.includes(staffTypes.VERIFICATION) ? (
    <LinkContainer to="/userApproval">
      <Button variant="primary" className="ml-3">
        Akceptuj nowych użytkowników
      </Button>
    </LinkContainer>
  ) : null;

export default AdminApproveUserButton;

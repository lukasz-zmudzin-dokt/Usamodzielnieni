import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { staffTypes } from "constants/staffTypes";
import { userTypes } from "constants/userTypes";

const AdminRegisterButton = ({ user }) =>
  user.type === userTypes.STAFF &&
  user.data.group_type.includes(staffTypes.VERIFICATION) ? (
    <LinkContainer className="my-2" to="/newAccount/staff">
      <Button variant="primary">Zarejestruj administratora</Button>
    </LinkContainer>
  ) : null;

export default AdminRegisterButton;

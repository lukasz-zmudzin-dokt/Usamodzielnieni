import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";

const UserListButton = ({ user }) =>
  user.type === userTypes.STAFF &&
  !user.data.group_type.includes(staffTypes.GUEST) ? (
    <LinkContainer to="/userList">
      <Button variant="primary">Zobacz listę wszystkich użytkowników</Button>
    </LinkContainer>
  ) : null;

export default UserListButton;

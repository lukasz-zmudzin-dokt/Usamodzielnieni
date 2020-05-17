import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { userTypes } from "constants/userTypes";

const UserListButton = ({ user }) =>
  user.type === userTypes.STAFF ? (
    <LinkContainer to="/userList">
      <Button variant="primary" className="ml-3">
        Zobacz listę wszystkich użytkowników
      </Button>
    </LinkContainer>
  ) : null;

export default UserListButton;

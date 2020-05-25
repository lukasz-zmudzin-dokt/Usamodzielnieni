import React from "react";
import {
  AdminRegisterButton,
  CVApprovalButton,
  EmployerMyOffersButton,
  AdminApproveUserButton,
  AdminOfferApprovalButton,
  DeleteAccountButton,
  UserListButton,
  UserPasswordChangeButton,
} from "../";
import { Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";

const ButtonsContainer = ({ user }) => {
  return (
    <div className="buttonsContainer">
      <DeleteAccountButton user={user} />
      <UserPasswordChangeButton user={user} />
      <CVApprovalButton user={user} />
      <EmployerMyOffersButton user={user} />
      <AdminRegisterButton user={user} />
      <AdminApproveUserButton user={user} />
      <AdminOfferApprovalButton user={user} />
      <UserListButton user={user} />
      {user.type === userTypes.STAFF &&
      !user.data.group_type.includes(staffTypes.GUEST) ? (
        <IndexLinkContainer className="my-2" to={`/changeData/${user.data.id}`}>
          <Button>Zmień swoje dane</Button>
        </IndexLinkContainer>
      ) : null}
    </div>
  );
};

export default ButtonsContainer;

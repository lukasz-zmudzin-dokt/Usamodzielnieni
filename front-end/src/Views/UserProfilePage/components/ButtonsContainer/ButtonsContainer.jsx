import React from "react";
import {
  AdminRegisterButton,
  CVApprovalButton,
  EmployerMyOffersButton,
  AdminApproveUserButton,
  AdminOfferApprovalButton,
  DeleteAccountButton,
  UserListButton,
  UserPasswordChangeButton
} from "../";

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
    </div>
  );
};

export default ButtonsContainer;

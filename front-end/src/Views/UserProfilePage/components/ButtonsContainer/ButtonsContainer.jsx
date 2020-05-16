import React from "react";
import {
  AdminRegisterButton,
  CVApprovalButton,
  EmployerMyOffersButton,
  AdminApproveUserButton,
  AdminOfferApprovalButton,
  DeleteAccountButton,
} from "../";

const ButtonsContainer = ({ user }) => {
  return (
    <div className="buttonsContainer">
      <DeleteAccountButton user={user} />
      <CVApprovalButton user={user} />
      <EmployerMyOffersButton user={user} />
      <AdminRegisterButton user={user} />
      <AdminApproveUserButton user={user} />
      <AdminOfferApprovalButton user={user} />
    </div>
  );
};

export default ButtonsContainer;

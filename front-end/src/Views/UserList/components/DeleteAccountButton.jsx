import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { DeletionModal } from "components";
import proxy from "config/api";
import { AlertContext, UserContext } from "context";
import {staffTypes} from "constants/staffTypes";

const deleteAccount = async (token, user) => {
  let url = `${proxy.account}admin/user_details/edit/${user.id}/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "DELETE", headers });

  if (response.status !== 200) {
    throw response.status;
  }
};

const DeleteAccountButton = ({ user, afterDeletion, ...rest }) => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { token, data } = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const onButtonClick = () => setShowModal(true);
  const onSuccess = async () => {
    setDisabled(true);
    try {
      await deleteAccount(token, user);
    } catch (e) {
      console.log(e);
      alertContext.showAlert("Wystąpił błąd podczas usuwania konta.");
      setDisabled(false);
      return;
    }
    alertContext.showAlert("Pomyślnie usunięto konto.", "success");
    afterDeletion(user);
  };

  return data.group_type.includes(staffTypes.VERIFICATION) && (
    <>
      <Button
        variant="danger"
        onClick={onButtonClick}
        disabled={disabled}
        {...rest}
      >
        {disabled ? "Ładowanie..." : "Usuń konto"}
      </Button>
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={onSuccess}
        question={"Czy na pewno chcesz usunąć to konto?"}
      />
    </>
  );
};

export default DeleteAccountButton;

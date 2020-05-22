import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { DeletionModal } from "components";
import proxy from "config/api";
import { AlertContext, UserContext } from "context";
import { userStatuses } from "constants/userStatuses";

const unblockAccount = async (token, user) => {
  let url = `${proxy.account}admin/user_admission/${user.id}/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "POST", headers });

  if (response.status !== 200) {
    throw response.status;
  }
};

const UnblockAccountButton = ({ user, setUser, ...rest }) => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { token } = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const onButtonClick = () => setShowModal(true);
  const onSuccess = async () => {
    setDisabled(true);
    try {
      await unblockAccount(token, user);
    } catch (e) {
      console.log(e);
      alertContext.showAlert("Wystąpił błąd podczas odblokowywania konta.");
      setDisabled(false);
      return;
    }
    alertContext.showAlert("Pomyślnie odblokowano konto.", "success");
    setDisabled(false);
    setUser({
      ...user,
      status: userStatuses.VERIFIED,
    });
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={onButtonClick}
        disabled={disabled}
        {...rest}
      >
        {disabled ? "Ładowanie..." : "Odblokuj konto"}
      </Button>
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={onSuccess}
        question="Czy na pewno chcesz odblokować to konto?"
        confirmLabel="Odblokuj"
        cancelLabel="Anuluj"
      />
    </>
  );
};

export default UnblockAccountButton;

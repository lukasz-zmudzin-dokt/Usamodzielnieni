import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DeletionModal } from "components";
import proxy from "config/api";

const deleteAccount = async (token) => {
  let url = `${proxy.account}/edit/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "DELETE", headers });

  if (response.status === 200) {
    return;
  } else {
    throw response.status;
  }
};

const DeleteAccountButton = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onButtonClick = () => setShowModal(true);
  const onSuccess = async () => {
    setDisabled(true);
    try {
      await deleteAccount(user.token);
    } catch (e) {
      console.log(e);
      // TODO: dodać alert po mergu pra
      setDisabled(false);
      return;
    }
    user.logout();
  };

  return (
    <>
      <Button variant="danger" onClick={onButtonClick} disabled={disabled}>
        {disabled ? "Ładowanie..." : "Usuń konto"}
      </Button>
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={onSuccess}
        question={"Czy na pewno chcesz usunąć swoje konto?"}
      />
    </>
  );
};

export default DeleteAccountButton;

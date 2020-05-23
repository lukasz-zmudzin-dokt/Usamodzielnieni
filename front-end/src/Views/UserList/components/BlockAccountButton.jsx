import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { DeletionModal } from "components";
import proxy from "config/api";
import { AlertContext, UserContext } from "context";
import { userStatuses } from "constants/userStatuses";
import {staffTypes} from "constants/staffTypes";

const blockAccount = async (token, user) => {
  let url = `${proxy.account}admin/user_block/${user.id}/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "POST", headers });

  if (response.status !== 200) {
    throw response.status;
  }
};

const BlockAccountButton = ({ user, setUser, ...rest }) => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { token, data } = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const onButtonClick = () => setShowModal(true);
  const onSuccess = async () => {
    setDisabled(true);
    try {
      await blockAccount(token, user);
    } catch (e) {
      console.log(e);
      alertContext.showAlert("Wystąpił błąd podczas blokowania konta.");
      setDisabled(false);
      return;
    }
    alertContext.showAlert("Pomyślnie zablokowano konto.", "success");
    setDisabled(false);
    setUser({
      ...user,
      status: userStatuses.BLOCKED,
    });
  };

  return (
      data.group_type.includes(staffTypes.BLOG_MODERATOR) ||
      data.group_type.includes(staffTypes.VERIFICATION)
  ) && (
    <>
      <Button
        variant="secondary"
        onClick={onButtonClick}
        disabled={disabled}
        {...rest}
      >
        {disabled ? "Ładowanie..." : "Zablokuj konto"}
      </Button>
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={onSuccess}
        question="Czy na pewno chcesz zablokować to konto?"
        confirmLabel="Zablokuj"
        cancelLabel="Anuluj"
      />
    </>
  );
};

export default BlockAccountButton;

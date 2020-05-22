import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { DeletionModal } from "components";
import proxy from "config/api";
import { AlertContext } from "context";

const changePhoto = async (token) => {
  let url = `${proxy.account}profile_picture/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "POST", headers });

  if (response.status !== 200) {
    throw response.status;
  }

  return;
};

const ChangePhotoButton = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const alertContext = useContext(AlertContext);

  const onButtonClick = () => setShowModal(true);
  const onSuccess = async () => {
    setDisabled(true);
    try {
      await changePhoto(user.token);
    } catch (e) {
      console.log(e);
      alertContext.showAlert("Wystąpił błąd podczas zmiany zdjęcia.");
      setDisabled(false);
      return;
    }
    user.changeData({ ...user.data, picture_url: "?" });
  };

  return (
    <>
      <Button onClick={onButtonClick} disabled={disabled}>
        {disabled ? "Ładowanie..." : "Zmień"}
      </Button>
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={onSuccess}
        question={"Czy chcesz usunąć zdjęcie?"}
      />
    </>
  );
};

export default ChangePhotoButton;

import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { DeletionModal } from "components";
import proxy from "config/api";
import { AlertContext } from "context";

const deletePhoto = async (token) => {
  let url = `${proxy.account}profile_picture/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "DELETE", headers });

  if (response.status !== 200) {
    throw response.status;
  }

  return;
};

const DeletePhotoButton = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const alertContext = useContext(AlertContext);

  const onButtonClick = () => setShowModal(true);
  const onSuccess = async () => {
    setDisabled(true);
    try {
      await deletePhoto(user.token);
    } catch (e) {
      console.log(e);
      alertContext.showAlert("Wystąpił błąd podczas usuwania zdjęcia.");
      setDisabled(false);
      return;
    }
    setDisabled(false);
    user.changeData({ ...user.data, picture_url: null });
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={onButtonClick}
        disabled={disabled || (user.data && user.data.picture_url === null)}
      >
        Usuń
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

export default DeletePhotoButton;

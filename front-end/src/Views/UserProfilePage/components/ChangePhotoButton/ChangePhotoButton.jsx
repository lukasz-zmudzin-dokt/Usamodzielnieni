import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ChangePhotoModal } from "../";

const ChangePhotoButton = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const onButtonClick = () => setShowModal(true);

  return (
    <>
      <Button onClick={onButtonClick}>Zmień</Button>
      <ChangePhotoModal show={showModal} setShow={setShowModal} user={user} />
    </>
  );
};

export default ChangePhotoButton;

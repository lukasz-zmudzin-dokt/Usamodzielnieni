import React, { useState } from "react";
import { Button } from "react-bootstrap";
import PasswordChangeModal from "./PasswordChangeModal.jsx";

const UserPasswordChangeButton = ({ user }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="info" className="my-2" onClick={(e) => setShow(true)}>
        Zmień hasło
      </Button>
      <PasswordChangeModal user={user} show={show} setShow={setShow} />
    </>
  );
};
export default UserPasswordChangeButton;

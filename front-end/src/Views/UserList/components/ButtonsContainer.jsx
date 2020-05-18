import React from "react";
import { Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { userTypes } from "constants/userTypes";
const ButtonsContainer = ({ user }) => {
  return (
    <div className="buttonsContainer">
      <IndexLinkContainer to={`/chats/${user.id}`}>
        <Button>Wyślij wiadomość</Button>
      </IndexLinkContainer>
      {user.type !== userTypes.STAFF && (
        <>
          <Button variant="secondary">Zablokuj</Button>
          <Button variant="danger">Usuń</Button>
        </>
      )}
    </div>
  );
};

export default ButtonsContainer;

import React from "react";
import { Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { userTypes } from "constants/userTypes";
import BlockAccountButton from "./BlockAccountButton";
import UnblockAccountButton from "./UnblockAccountButton";
import DeleteAccountButton from "./DeleteAccountButton";
import { userStatuses } from "constants/userStatuses";

const ButtonsContainer = ({ user, setUser, deleteUser }) => {
  const disableButtons = user.status === userStatuses.BLOCKED;

  return (
    <div className="buttonsContainer">
      {disableButtons ? (
        <Button disabled={disableButtons}>Wyślij wiadomość</Button>
      ) : (
        <IndexLinkContainer to={`/chats/${user.id}`}>
          <Button>Wyślij wiadomość</Button>
        </IndexLinkContainer>
      )}
      {user.type !== userTypes.STAFF && (
        <>
          {!disableButtons ? (
            <BlockAccountButton user={user} setUser={setUser} />
          ) : (
            <UnblockAccountButton user={user} setUser={setUser} />
          )}
          <DeleteAccountButton
            disabled={disableButtons}
            user={user}
            afterDeletion={deleteUser}
          />
        </>
      )}
    </div>
  );
};

export default ButtonsContainer;

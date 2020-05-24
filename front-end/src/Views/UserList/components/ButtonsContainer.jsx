import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { userTypes } from "constants/userTypes";
import BlockAccountButton from "./BlockAccountButton";
import UnblockAccountButton from "./UnblockAccountButton";
import DeleteAccountButton from "./DeleteAccountButton";
import { userStatuses } from "constants/userStatuses";
import { staffTypes } from "constants/staffTypes";
import { UserContext } from "context";
const ButtonsContainer = ({ user, setUser, deleteUser }) => {
  const disableButtons = user.status === userStatuses.BLOCKED;
  const userCon = useContext(UserContext);
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
            user.status === userStatuses.VERIFIED && (
              <BlockAccountButton user={user} setUser={setUser} />
            )
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
      {userCon.data.group_type.includes(staffTypes.VERIFICATION) &&
      user.type !== userTypes.STAFF ? (
        <IndexLinkContainer to={`/changeData/${user.id}`}>
          <Button>Edytuj dane</Button>
        </IndexLinkContainer>
      ) : null}
    </div>
  );
};

export default ButtonsContainer;

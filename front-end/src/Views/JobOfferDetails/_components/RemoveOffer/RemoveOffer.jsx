import React, { useState, useRef, useContext } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteOffer } from "../../functions/deleteOffer";
import { AlertContext } from "context";

const RemoveOffer = ({ id, user }) => {
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const alertC = useRef(useContext(AlertContext));

  const handleDeleteOffer = async () => {
    try {
      await deleteOffer(id, user.token);
      alertC.current.showAlert("Pomyślnie usunięto ofertę.", "success");
    } catch (err) {
      alertC.current.showAlert("Wystąpił błąd przy usuwaniu oferty.");
    }

    setConfirmDeletion(false);
  };

  const msg = confirmDeletion ? (
    <Alert variant="warning">
      Czy na pewno chcesz usunąć tę ofertę?
      <Button variant="warning" className="ml-3" onClick={handleDeleteOffer}>
        Tak
      </Button>
    </Alert>
  ) : null;

  return (
    <div className="removeOffer">
      {msg || (
        <Button variant="danger" onClick={(e) => setConfirmDeletion(true)}>
          Usuń ofertę
        </Button>
      )}
    </div>
  );
};

export default RemoveOffer;

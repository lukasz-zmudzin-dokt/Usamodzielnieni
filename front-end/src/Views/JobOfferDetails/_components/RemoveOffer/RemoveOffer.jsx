import React, { useState, useRef, useContext } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteOffer } from "../../functions/deleteOffer";
import { AlertContext } from "context";
import { DeletionModal } from "components";

const RemoveOffer = ({ id, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);

  const alertC = useRef(useContext(AlertContext));

  const handleDeleteOffer = async () => {
    setDeletionConfirmed(false);
    try {
      await deleteOffer(id, user.token);
      alertC.current.showAlert("Pomyślnie usunięto ofertę.", "success");
    } catch (err) {
      alertC.current.showAlert("Wystąpił błąd przy usuwaniu oferty.");
    }
  };

  const handleOnClick = () => {
    setShowModal(true);
  };

  if (deletionConfirmed) handleDeleteOffer();

  return (
    <div className="removeOffer">
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={setDeletionConfirmed}
        question={"Czy na pewno chcesz usunąć tę ofertę?"}
      />
      <Button variant="danger" onClick={handleOnClick}>
        Usuń ofertę
      </Button>
    </div>
  );
};

export default RemoveOffer;

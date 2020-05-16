import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteOffer } from "../../functions/deleteOffer";
import { DeletionModal } from "components";

const RemoveOffer = ({ id, user }) => {
  const [deleted, setDeleted] = useState(false);
  const [deletionError, setDeletionError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);

  const handleDeleteOffer = async () => {
    setDeletionConfirmed(false);
    try {
      await deleteOffer(id, user.token);
    } catch (err) {
      setDeletionError(true);
    }
    setDeleted(true);
  };

  const handleOnClick = () => {
    setShowModal(true);
  };

  const msg =
    deleted && deletionError ? (
      <Alert variant="danger">Wystąpił błąd przy usuwaniu oferty.</Alert>
    ) : (
      deleted &&
      !deletionError && (
        <Alert variant="success">Pomyślnie usunięto ofertę.</Alert>
      )
    );

  if (deletionConfirmed) handleDeleteOffer();

  return (
    <div className="removeOffer">
      <DeletionModal
        show={showModal}
        setShow={setShowModal}
        delConfirmed={setDeletionConfirmed}
        question={"Czy na pewno chcesz usunąć tę ofertę?"}
      />
      {msg || (
        <Button variant="danger" onClick={handleOnClick}>
          Usuń ofertę
        </Button>
      )}
    </div>
  );
};

export default RemoveOffer;

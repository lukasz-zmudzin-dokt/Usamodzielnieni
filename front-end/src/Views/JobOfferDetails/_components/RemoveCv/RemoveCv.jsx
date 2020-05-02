import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { deleteOffer } from '../../functions/deleteOffer';

const RemoveCv = ({ id, user }) => {
    const [confirmDeletion, setConfirmDeletion] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deletionError, setDeletionError] = useState(false);

    const handleDeleteOffer = async () => {
        try {
          await deleteOffer(id, user.token);
        } catch(err) {
          setDeletionError(true);
        }
        setDeleted(true);
        setConfirmDeletion(false);
    };

    const msg = confirmDeletion ? (
            <Alert variant="warning">
                Czy na pewno chcesz usunąć tę ofertę?
                <Button variant="warning" className="ml-3" onClick={handleDeleteOffer}>
                    Tak
                </Button>
            </Alert>
        ) : 
        (deleted && deletionError) ? <Alert variant="danger">Wystąpił błąd przy usuwaniu oferty.</Alert> :
        (deleted && !deletionError) && <Alert variant="success">Pomyślnie usunięto ofertę.</Alert>

    return (
        <div className="removeCv">
            {msg || <Button variant="danger" onClick={e => setConfirmDeletion(true)}>Usuń ofertę</Button>}
        </div>
    )
}

export default RemoveCv;

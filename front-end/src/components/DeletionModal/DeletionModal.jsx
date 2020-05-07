import React from "react";
import {Modal, Button} from "react-bootstrap";

const DeletionModal = (show, setShow, delConfirmed) => {
    
    const handleOnClick = (e) => {
        if(e.target.id === "cancel")
            setShow(false);
        else if(e.target.id === "confirm") {
            setShow(false);
            delConfirmed(true);
        }
    }

    return (
        <Modal show={show}>
            <Modal.Body>Czy na pewno chcesz usunąć ten post?</Modal.Body>
            <Modal.Footer>
                <Button id="cancel" variant="primary" onClick={e => handleOnClick(e)}>
                    Zostaw
                </Button>
                <Button id="confirm" variant="danger" onClick={e => handleOnClick(e)}>
                    Usuń
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletionModal;
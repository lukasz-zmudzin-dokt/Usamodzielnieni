import React from "react";
import {Modal, Button} from "react-bootstrap";

const DeletionModal = (show, setShow, handleOnClick, delConfirmed) => {
    return (
        <Modal show={show}>
            <Modal.Body>Czy na pewno chcesz usunąć ten post?</Modal.Body>
            <Modal.Footer>
                <Button id="cancel" variant="primary" onClick={e => handleOnClick(e, setShow)}>
                    Zostaw
                </Button>
                <Button id="confirm" variant="danger" onClick={e => handleOnClick(e, setShow, delConfirmed)}>
                    Usuń
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletionModal;
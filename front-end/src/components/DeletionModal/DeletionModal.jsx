import React from "react";
import {Modal, Button} from "react-bootstrap";

const DeletionModal = (show, setShow, delConfirmed, question, confirmLabel, cancelLabel) => {
    
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
            <Modal.Body>{question}</Modal.Body>
            <Modal.Footer>
                <Button id="cancel" variant="primary" onClick={e => handleOnClick(e)}>
                    {cancelLabel? cancelLabel : "Zostaw"}
                </Button>
                <Button id="confirm" variant={"danger"} onClick={e => handleOnClick(e)}>
                    {confirmLabel? confirmLabel : "Usuń ✗"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletionModal;
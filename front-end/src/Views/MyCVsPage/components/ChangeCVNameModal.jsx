import React, {useContext, useState} from "react";
import { UserContext } from "context";
import { Button, Form, Modal} from "react-bootstrap";

const ChangeCVNameModal = ({ show = false }) => {

    const context = useContext(UserContext);
    const status = useState("new");

    const handleOnClick = (e) => {

    };

    return (
        <Modal show={show}>
            <Modal.Body>
                Zmień nazwę CV
            </Modal.Body>
            {/*<Modal.Footer>
                <Button id="cancel" variant="info" onClick={e => handleOnClick(e)}>
                    Zostaw bieżącą nazwę
                </Button>
                <Button id="confirm" variant="primary" onClick={e => handleOnClick(e)}>
                    Zmień nazwę
                </Button>
            </Modal.Footer>*/}
        </Modal>
    );
};

export default ChangeCVNameModal;
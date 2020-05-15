import React, { useContext, useState } from "react";
import { UserContext } from "context";
import { Button, Form, Modal } from "react-bootstrap";
import { setCVName } from "../functions/setCVName";
import Alert from "react-bootstrap/Alert";

const ChangeCVNameModal = ({ show, setShow, cvId, setCVNewName }) => {

    const context = useContext(UserContext);
    const [status, setStatus] = useState("new");
    let newCVName = {};

    const handleClose = () => {
        setShow(false);
        setStatus("new");
    }

    const changeCVName = async (e, cvName) => {
        e.preventDefault();
        try {
            const res = await setCVName(context.token, cvId, cvName);
            if(res === "CV name changed to: " + cvName) {
                setStatus("success");
                setCVNewName(cvName);
            } else {
                setStatus("fail");
            }
        } catch (err) {
            setStatus("fail");
        }
        setTimeout(handleClose, 1500);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                Zmień nazwę CV
            </Modal.Body>
            <Modal.Footer>
                {status === "new" ? (
                    <Form className="w-100" onSubmit={e => changeCVName(e, newCVName.value)}>
                        <Form.Row>
                            <Form.Group controlId="formCVNewName" className="w-100">
                                <Form.Control placeholder="Nowa nazwa CV" ref={input => newCVName = input} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="justify-content-end">
                            <Button className="m-1" id="cancel" variant="info" onClick={handleClose}>
                                Zostaw bieżącą nazwę
                            </Button>
                            <Button className="m-1" id="confirm" type="submit" variant="primary">
                                Zmień nazwę
                            </Button>
                        </Form.Row>
                    </Form>
                ) : status === "success" ? (
                    <Alert className="w-100" variant="success">
                        Pomyślnie zmieniono nazwę CV.
                    </Alert>
                ) : (
                    <Alert className="w-100" variant="danger">
                        Wystąpił błąd.
                    </Alert>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeCVNameModal;
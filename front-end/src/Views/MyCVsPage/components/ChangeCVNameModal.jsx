import React, { useContext, useState } from "react";
import { UserContext } from "context";
import { Button, Form, Modal } from "react-bootstrap";
import { setCVName } from "../functions/setCVName";
import Alert from "react-bootstrap/Alert";

const ChangeCVNameModal = ({ show, setShow, cvId, setCVNewName }) => {

    const context = useContext(UserContext);
    const [correct, setCorrect] = useState(true);
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClose = () => {
        setShow(false);
        setCorrect(true);
        setName("");
        setSuccess(false);
        setError(false);
    };

    const changeCVName = async (e) => {
        e.preventDefault();
        if (name === "") {
            setCorrect(false);
        } else {
            try {
                await setCVName(context.token, cvId, name);
                setSuccess(true);
                setCVNewName(name);
            } catch (err) {
                setError(true);
            }
            setTimeout(handleClose, 1500);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                Zmień nazwę CV
            </Modal.Body>
            <Modal.Footer>
                <Form className="w-100" onSubmit={changeCVName}>
                    <Form.Row>
                        <Form.Group controlId="formCVNewName" className="w-100">
                            <Form.Control
                                placeholder="Nowa nazwa CV"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                isInvalid={!correct}
                                maxLength="30"
                            />
                            <Form.Control.Feedback type="invalid">Nazwa nie może być pusta!</Form.Control.Feedback>
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
                { success ? (
                    <Alert className="w-100" variant="success">
                        Pomyślnie zmieniono nazwę CV.
                    </Alert>
                ) : error ? (
                    <Alert className="w-100" variant="danger">
                        Wystąpił błąd podczas próby zmiany nazwy CV.
                    </Alert>
                ) : null}
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeCVNameModal;
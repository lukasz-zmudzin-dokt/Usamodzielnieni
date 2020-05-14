import React, {useContext, useState} from "react";
import { UserContext } from "context";
import {Button, Form, FormControl, Modal, Row} from "react-bootstrap";
import {setCVName} from "../functions/setCVName";
import Alert from "react-bootstrap/Alert";

const ChangeCVNameModal = ({ show, setShow, cvId }) => {

    const context = useContext(UserContext);
    const [status, setStatus] = useState("new");
    let newCVName = "";

    const handleOnClick = (e) => {
        e.preventDefault();
        setShow(false);
    };

    const changeCVName = async (e) => {
        e.preventDefault();
        console.log(cvId);
        console.log(newCVName.value);
        console.log(context.token);
        try {
            const res = await setCVName(context.token, cvId, newCVName.value);
            console.log(res);
            if(res === "CV name changed to: " + newCVName.value) {
                setStatus("success");
                console.log(status);
                setTimeout(setShow(false), 2000);
            } else {
                setStatus("fail");
                console.log(status);
            }

        } catch (err) {
            setStatus("fail");
            console.log(status);
        }
    }

    return (
        <Modal show={show}>
            <Modal.Body>
                Zmień nazwę CV
            </Modal.Body>
            <Modal.Footer>
                {status === "new" ? (
                    <Form className="w-100" onSubmit={e => changeCVName(e)}>
                        <Form.Row>
                            <Form.Group controlId="formCVNewName" className="w-100">
                                <Form.Control placeholder="Nowa nazwa CV" ref={input => newCVName = input} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="justify-content-end">
                            <Button className="m-1" id="cancel" variant="info" onClick={e => handleOnClick(e)}>
                                Zostaw bieżącą nazwę
                            </Button>
                            <Button className="m-1" id="confirm" type="submit" variant="primary">
                                Zmień nazwę
                            </Button>
                        </Form.Row>
                    </Form>
                ) : status === "success" ? (
                    <Alert className="w-100" variant="success">
                        Pomyślnie zmieniono zanwę CV.
                    </Alert>
                ) : (
                    <div />
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeCVNameModal;
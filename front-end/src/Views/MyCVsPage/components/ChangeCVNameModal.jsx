import React, {useContext, useState} from "react";
import { UserContext } from "context";
import {Button, Form, FormControl, Modal, Row} from "react-bootstrap";
import {setCVName} from "../functions/setCVName";

const ChangeCVNameModal = ({ show, setShow, cvId }) => {

    const context = useContext(UserContext);
    const status = useState("new");
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
        const res = await setCVName(context.token, cvId, newCVName.value);
    }

    return (
        <Modal show={show}>
            <Modal.Body>
                Zmień nazwę CV
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeCVNameModal;
import React, {useContext, useRef, useState} from "react";
import {userTypes} from "constants/userTypes";
import {staffTypes} from "constants/staffTypes";
import {Button, Form, Modal} from "react-bootstrap";
import {AlertContext} from "context/AlertContext";
import FormGroup from "components/FormGroup";

const NewVideoblogButton = (user) => {
    const [show, setShow] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [validated, setValidated] = useState(false);

    const alertC = useRef(useContext(AlertContext));
    const fileInput = useRef(null);

    const onChange = () => { // + sprawdzanie wielkości pliku

    };

    const onSubmit = (e) => {

    };

    return user.type === userTypes.STAFF &&
        user.data.group_type?.includes(staffTypes.BLOG_CREATOR) && (
            <>
                <Button variant="primary" onClick={e => setShow(true)}>Załóż nowy wideoblog</Button>
                <Modal show={show} onHide={e => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nowy wideoblog</Modal.Title>
                    </Modal.Header>
                    <Form noValidate validated={validated} onSubmit={onSubmit}>
                        <Modal.Body>
                            <Form.Label>(Opcjonalnie) Dodaj zdjęcie w nagłówku bloga</Form.Label>
                            <Form.File
                                id="custom-file"
                                ref={fileInput}
                                custom
                                onChange={onChange}
                                label={"Dodaj zdjęcie..."}
                                accept="image/*"
                                data-browse="Wybierz plik"
                            />
                            <FormGroup
                                header="Tytuł bloga"
                                id="newTitle"
                                setVal={setNewTitle}
                                val={title}
                                required
                                val={newTitle}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="success">Stwórz nowy wideoblog</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
};
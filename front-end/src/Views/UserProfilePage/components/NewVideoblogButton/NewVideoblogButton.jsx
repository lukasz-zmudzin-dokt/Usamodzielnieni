import React, {useContext, useRef, useState} from "react";
import {userTypes} from "constants/userTypes";
import {staffTypes} from "constants/staffTypes";
import {Button, Form, Modal} from "react-bootstrap";
import {AlertContext} from "context/AlertContext";
import FormGroup from "components/FormGroup";
import {
    VIDEOBLOG_CATEGORY,
    VIDEOBLOG_INITIAL_CONTENT,
    VIDEOBLOG_TAGS
} from "constants/videoBlogInitialValues";
import {reserveSpace, uploadPhoto, postBlogPost} from "Views/BlogPostForm/functions/apiCalls";
import {Redirect} from "react-router-dom";

const handleVideoBlogAddition = async (token, data, head) => {
    try {
        const { id } = await reserveSpace(token);
        await postBlogPost(data, token, "POST", id);
        head && await uploadPhoto(id, head, token, "header");
        return id;
    } catch(e) {
        throw e;
    }
};

const NewVideoblogButton = ({user}) => {
    const [show, setShow] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [validated, setValidated] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState(null);

    const alertC = useRef(useContext(AlertContext));
    const fileInput = useRef(null);

    const clearInput = () => {
        setNewTitle("");
        setValidated(false);
        setShow(false);
    };

    const onChange = () => { // + sprawdzanie wielkości pliku

    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
        } else {
            let data = {
                title: newTitle,
                category: VIDEOBLOG_CATEGORY,
                content: VIDEOBLOG_INITIAL_CONTENT,
                tags: VIDEOBLOG_TAGS
            };
            let head = fileInput.current.files?.[0];
            try {
                const res = await handleVideoBlogAddition(user.token, data, head);
                setId(res);
                clearInput();
                alertC.current.showAlert("Pomyślnie założono nowy wideoblog.", "success");
                setRedirect(true);
            } catch(e) {
                alertC.current.showAlert("Wystąpił błąd przy dodawaniu wideobloga.");
            }
        }
    };

    return user.type === userTypes.STAFF &&
        user.data.group_type?.includes(staffTypes.BLOG_CREATOR) && (
            <>
                <Button variant="primary" className="my-2" onClick={e => setShow(true)}>Załóż nowy wideoblog</Button>
                <Modal show={show} onHide={e => clearInput()}>
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
                                className="mb-2"
                            />
                            <FormGroup
                                header="Tytuł bloga"
                                id="newTitle"
                                setVal={setNewTitle}
                                required
                                incorrect="Podaj tytuł wideobloga"
                                val={newTitle}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="success">Stwórz nowy wideoblog</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                {redirect && <Redirect to={"/blog/blogpost/" + id} />}
            </>
        );
};

export default NewVideoblogButton;
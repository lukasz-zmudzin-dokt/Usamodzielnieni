import { Button, Form, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import {
  postBlogPost,
  reserveSpace,
  uploadPhoto,
} from "Views/BlogPostForm/functions/apiCalls";
import {
  VIDEOBLOG_CATEGORY,
  VIDEOBLOG_INITIAL_CONTENT,
  VIDEOBLOG_TAGS,
} from "constants/videoBlogInitialValues";
import FormGroup from "../FormGroup";
import { AlertContext } from "context/AlertContext";
import { approveFileSize } from "../../utils/approveFile/approveFile";

const handleVideoBlogAddition = async (token, data, head) => {
  try {
    const { id } = await reserveSpace(token);
    await postBlogPost(data, token, "POST", id);
    head && (await uploadPhoto(id, head, token, "header"));
    return id;
  } catch (e) {
    throw e;
  }
};

const NewVideoBlogModal = ({ show, setShow, user }) => {
  const [newTitle, setNewTitle] = useState("");
  const [validated, setValidated] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState(null);
  const [label, setLabel] = useState("");

  const alertC = useRef(useContext(AlertContext));
  let fileInput = useRef(null);

  const clearInput = () => {
    setNewTitle("");
    setValidated(false);
    setShow(false);
  };

  const onChange = () => {
    const file = fileInput.current?.files?.[0];
    if (!approveFileSize(file)) {
      alertC.current.showAlert(
        "Wybrany plik jest za duży. Maksymanly rozmiar pliku to 15 MB."
      );
      fileInput = null;
    } else {
      setLabel(file.name);
    }
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
        tags: VIDEOBLOG_TAGS,
      };
      let head = fileInput.current.files?.[0];
      try {
        const res = await handleVideoBlogAddition(user.token, data, head);
        setId(res);
        clearInput();
        alertC.current.showAlert(
          "Pomyślnie założono nowy wideoblog.",
          "success"
        );
        setRedirect(true);
      } catch (e) {
        alertC.current.showAlert("Wystąpił błąd przy dodawaniu wideobloga.");
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={(e) => clearInput()}>
        <Modal.Header closeButton>
          <Modal.Title>Nowy wideoblog</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Label>
              (Opcjonalnie) Dodaj zdjęcie w nagłówku bloga
            </Form.Label>
            <Form.File
              id="custom-file"
              ref={fileInput}
              custom
              onChange={onChange}
              label={label || "Dodaj zdjęcie..."}
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
            <Button variant="primary" type="success">
              Stwórz nowy wideoblog
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {redirect && <Redirect to={"/blog/blogpost/" + id} />}
    </>
  );
};

export default NewVideoBlogModal;

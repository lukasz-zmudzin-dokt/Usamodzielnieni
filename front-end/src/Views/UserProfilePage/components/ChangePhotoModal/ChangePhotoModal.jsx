import React, { useState, useContext, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AlertContext } from "context";
import proxy from "config/api";
import {approveFileSize} from "utils/approveFile/approveFile";

const addPhoto = async (token, photo) => {
  const formData = new FormData();
  formData.append("picture", photo, photo.name);

  const url = `${proxy.account}profile_picture/`;
  const headers = {
    Authorization: "Token " + token,
  };

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers,
  });

  if (response.status !== 200) {
    throw response.status;
  }

  return (await response.json()).picture_url;
};

const ChangePhotoModal = ({ show, setShow, user }) => {
  const [label, setLabel] = useState();
  const [validated, setValidated] = useState(false);

  const fileInput = useRef(null);
  const alertContext = useContext(AlertContext);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
    fileInput.current.value = null;
    setLabel(undefined);
  };

  const onSubmit = async (e) => {
    console.log("onSubmit", fileInput.current);
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
    } else {
      let picture_url = null;
      try {
        picture_url = await addPhoto(user.token, fileInput.current.files[0]);
      } catch (e) {
        console.log(e);
        alertContext.showAlert("Wystąpił błąd podczas zmiany zdjęcia.");
        handleClose();
        return;
      }
      user.changeData({ ...user.data, picture_url });
      alertContext.showAlert("Pomyślnie przesłano nowe zdjęcie.", "success");
      handleClose();
    }
  };

  const onChange = () => {
    if (approveFileSize(fileInput.current?.files?.[0])) {
      const filename = fileInput.current?.files?.[0]?.name;
      setLabel(filename);
    } else {
      alertContext.showAlert("Wybrany plik jest za duży. Maksymalny rozmiar pliku to 15 MB.");
      setLabel(undefined);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={onSubmit} noValidate validated={validated}>
        <Modal.Body>
          <Form.Label
            htmlFor="custom-file"
            className={validated && !fileInput.current?.value && "is-invalid"}
          >
            Zdjęcie:
          </Form.Label>
          <Form.File
            id="custom-file"
            ref={fileInput}
            custom
            onChange={onChange}
            label={label || "Dodaj swoje zdjęcie..."}
            accept="image/*"
            data-browse="Wybierz plik"
            required
          />
          <Form.Control.Feedback type="invalid">
            Wybierz zdjęcie.
          </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button type="submit" variant="primary">
            Prześlij
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ChangePhotoModal;

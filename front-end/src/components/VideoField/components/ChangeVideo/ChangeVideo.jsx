import React, { useState, useRef, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { changeUrl } from "components/VideoField/functions";
import { FormGroup } from "components";
import { AlertContext } from "context";

const ChangeVideo = ({ id, token }) => {
  const [show, setShow] = useState(false);
  const [newVideo, setNewVideo] = useState({
    id: id,
    url: "",
    category: "",
    description: "",
  });
  const [validated, setValidated] = useState(false);
  const alertC = useRef(useContext(AlertContext));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(newVideo);
    if (form.checkValidity() === true) {
      try {
        await changeUrl(token, newVideo);
        alertC.current.showAlert("Pomyślnie zmieniono film.", "success");
      } catch (err) {
        alertC.current.showAlert("Nie udało się zmienić filmu.");
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          {" "}
          <Modal.Title as="h3">Wklej nowy url:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            as={Form}
            noValidate
            validated={validated}
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormGroup
              type="text"
              val={newVideo.url}
              setVal={(val) => setNewVideo({ ...newVideo, url: val })}
              header="Podaj link do filmu"
              required
              incorrect="To pole jest wymagane."
              id="url"
            />
            <FormGroup
              type="textarea"
              val={newVideo.description}
              setVal={(val) => setNewVideo({ ...newVideo, description: val })}
              header="Opis(opcjonalne)"
              id="description"
            />
            <FormGroup
              type="number"
              val={newVideo.category}
              setVal={(val) => setNewVideo({ ...newVideo, category: val })}
              header="Kategoria(opcjonalne)"
              id="category"
            />
            <Button type="submit" variant="primary" className="mt-2">
              Prześlij
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        variant="primary"
        className="videoField__button"
        onClick={() => setShow(true)}
      >
        Zmień film
      </Button>
    </>
  );
};

export default ChangeVideo;

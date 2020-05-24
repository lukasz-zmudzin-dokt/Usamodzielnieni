import React, { useState, useRef, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { changeUrl } from "components/VideoField/functions";
import { FormGroup } from "components";
import { AlertContext } from "context";

const ChangeVideo = ({ id, token, video, setVideo }) => {
  const [show, setShow] = useState(false);
  const [newVideo, setNewVideo] = useState({
    id: id,
    url: "",
    category: "",
    description: "",
  });
  const [validated, setValidated] = useState(false);
  const alertC = useRef(useContext(AlertContext));

  useEffect(() => {
    if (video) {
      setNewVideo({
        ...video,
        url: `https://www.youtube.com/watch?v=${video.url}`,
        category: video.category?.id,
      });
    }
  }, [video]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    let isOk;
    if (form.checkValidity() === true) {
      try {
        await changeUrl(token, newVideo);
        isOk = true;
        alertC.current.showAlert("Pomyślnie zmieniono film.", "success");

        setShow(false);
      } catch (err) {
        alertC.current.showAlert("Nie udało się zmienić filmu.");
      }
    }
    if (isOk) {
      const index = newVideo.url.lastIndexOf("=");
      let changeRes = newVideo.url.slice(index + 1);
      setVideo({ ...newVideo, url: changeRes });
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

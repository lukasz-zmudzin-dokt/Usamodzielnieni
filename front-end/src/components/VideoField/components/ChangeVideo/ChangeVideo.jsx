import React, { useState, useRef, useContext } from "react";
import { OverlayTrigger, Button, Popover, Form } from "react-bootstrap";
import { changeUrl } from "components/VideoField/functions";
import { FormGroup } from "components";
import { AlertContext } from "context";

const ChangeVideo = ({ id, token }) => {
  const [newVideo, setNewVideo] = useState({
    id: id,
    url: "",
  });
  const alertC = useRef(useContext(AlertContext));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newVideo);
      await changeUrl(token, newVideo);
      alertC.current.showAlert("Pomyślnie zmieniono film.", "success");
    } catch (err) {
      alertC.current.showAlert("Nie udało się zmienić filmu.");
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Wklej nowy url:</Popover.Title>
      <Popover.Content as={Form} onSubmit={(e) => handleSubmit(e)}>
        <FormGroup
          type="text"
          val={newVideo.url}
          setVal={(val) => setNewVideo({ ...newVideo, url: val })}
          header="Podaj link do filmu"
          required
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
          type="text"
          val={newVideo.category}
          setVal={(val) => setNewVideo({ ...newVideo, category: val })}
          header="Kategoria(opcjonalne)"
          id="category"
        />

        <Button type="submit" variant="primary" className="mt-2">
          Prześlij
        </Button>
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button variant="primary" className="videoField__button">
        Zmień film
      </Button>
    </OverlayTrigger>
  );
};

export default ChangeVideo;

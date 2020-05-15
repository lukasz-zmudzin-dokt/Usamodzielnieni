import React, { useState } from "react";
import { OverlayTrigger, Button, Popover, Form } from "react-bootstrap";
import { changeUrl } from "components/VideoField/functions/changeUrl";

const ChangeVideo = ({ id, token }) => {
  const [newUrl, setNewUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changeUrl(token, id, newUrl);
    } catch (err) {}
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Wklej nowy url:</Popover.Title>
      <Popover.Content as={Form} onSubmit={(e) => handleSubmit(e)}>
        <Form.Control
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Podaj link do filmu"
          required
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

import React, { useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import sendMessageIcon from "assets/sendMessageIcon.svg";

const ChatForm = ({ sendMessage }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message !== "") {
      try {
        //console.log(message);
        await sendMessage(message);
        setMessage("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const keyPressed = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const [message, setMessage] = useState("");

  return (
    <Form onSubmit={(e) => handleSubmit(e)} className="m-3">
      <InputGroup className="mb-3">
        <FormControl
          className="overflow-auto"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => keyPressed(e)}
          as="textarea"
          placeholder="Napisz wiadomość..."
        />
        <InputGroup.Append>
          <Button data-testid="button" type="submit" variant="light">
            <img src={sendMessageIcon} alt="send message" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default ChatForm;

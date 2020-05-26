import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { UserPicture } from "components";

const ChatInfo = ({ chat, user, ...rest }) => {
  const [contact, setContact] = useState({ data: {} });
  const mapUser = useCallback(() => {
    if (chat.first.username === user.data.username) {
      setContact(chat.second);
      return {
        data: {
          ...chat.second,
        },
      };
    }
    return {
      data: {
        ...chat.first,
      },
    };
  }, [chat.first, chat.second, user.data.username]);

  console.log(contact);

  useEffect(() => {
    setContact(mapUser(chat));
  }, [chat, mapUser]);
  return (
    <Row {...rest} className="chatInfo">
      <Col xs="auto" className="chatInfo__picture">
        <UserPicture user={mapUser()} />
      </Col>
      <Col>
        <h5>{`${contact.data.username}`}</h5>
        <small>{`Ostatnia wiadomość: ${new Date(
          chat.updated
        ).toLocaleString()}`}</small>
      </Col>
      <Col xs="12" md="auto" className="align-self-center text-center">
        <IndexLinkContainer to={`/chats/${contact.data.username}`}>
          <Button className="mt-2 mt-md-0">Pokaż szczegóły</Button>
        </IndexLinkContainer>
      </Col>
    </Row>
  );
};

export default ChatInfo;

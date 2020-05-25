import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { UserPicture } from "components";

const ChatInfo = ({ chat, ...rest }) => {
  return (
    <Row {...rest} className="chatInfo">
      <Col xs="auto" className="chatInfo__picture">
        <UserPicture user={chat.first} />
      </Col>
      <Col>
        <h5>{`${chat.first.username}`}</h5>
        <small>{`Ostatnia wiadomość: ${new Date(
          chat.updated
        ).toLocaleString()}`}</small>
      </Col>
      <IndexLinkContainer
        className="align-self-center"
        to={`/chats/${chat.first.username}`}
      >
        <Button>Pokaż szczegóły</Button>
      </IndexLinkContainer>
    </Row>
  );
};

export default ChatInfo;

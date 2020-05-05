import React from "react";
import { ListGroup, Container, Card } from "react-bootstrap";
import MessageItem from "./_components/MessageItem";

const MessagesList = () => {
  const data = [
    {
      content:
        "Info długa wiadomość bardzo jakaś dzień dobry i te sprawy co tam jak tam jeszcze trochę żeby się zawinęło albo jeszcze trochę",
      send: "11:55 12.03.2020",
      side: "left",
    },
    {
      content:
        "Info długa wiadomość bardzo jakaś dzień dobry i te sprawy co tam jak tam jeszcze trochę żeby się zawinęło albo jeszcze trochę",
      send: "11:55 12.03.2020",
      side: "right",
    },
    {
      content: "a",
      send: "11:55 12.03.2020",
      side: "right",
    },
    {
      content: "b",
      send: "11:55 12.03.2020",
      side: "left",
    },
  ];
  return (
    <Container>
      <Card>
        <Card.Header>Rozmowa z X</Card.Header>
        <Card.Body>
          <ListGroup>
            {data.map(({ content, send, side }) => (
              <MessageItem content={content} send={send} side={side} />
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MessagesList;

import React, { useState, useEffect, useContext } from "react";
import { ListGroup, Container, Card } from "react-bootstrap";
import MessageItem from "./_components/MessageItem";
import proxy from "config/api";
import { UserContext } from "context";
import { useParams } from "react-router-dom";

const getMessages = async (token, id) => {
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };
  const url = `${proxy.chat}/messages/${id}`;
  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json();
  } else {
    throw response.status;
  }
};

const dataD = [
  {
    content:
      "Info długa wiadomość bardzo jakaś dzień dobry i te sprawy co tam jak tam jeszcze trochę żeby się zawinęło albo jeszcze trochę",
    send: "11:55 12.03.2020",
    side: "left",
    id: 0,
  },
  {
    content:
      "Info długa wiadomość bardzo jakaś dzień dobry i te sprawy co tam jak tam jeszcze trochę żeby się zawinęło albo jeszcze trochę",
    send: "11:55 12.03.2020",
    side: "right",
    id: 1,
  },
  {
    content: "a",
    send: "11:55 12.03.2020",
    side: "right",
    id: 2,
  },
  {
    content: "b",
    send: "11:55 12.03.2020",
    side: "left",
    id: 3,
  },
]; // dane do testowania jak wygląda

const MessagesList = () => {
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const loadMessages = async (token, id) => {
      let res;
      try {
        res = await getMessages(token, id);
      } catch (e) {
        console.log(e);
        res = [];
      }
      setData(res);
    };
    loadMessages(user.token, id);
  }, [id, user.token]);

  return (
    <Container>
      <Card>
        <Card.Header>Rozmowa z X</Card.Header>
        <Card.Body>
          <ListGroup>
            {data.map(({ content, send, side, id }) => (
              <MessageItem key={id} content={content} send={send} side={side} />
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MessagesList;

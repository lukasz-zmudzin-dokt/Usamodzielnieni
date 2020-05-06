import React, { useState, useEffect, useContext, useRef } from "react";
import { ListGroup, Container, Card, Button } from "react-bootstrap";
import MessageItem from "./components/MessageItem";
import proxy from "config/api";
import { UserContext } from "context";
import { useParams, useHistory } from "react-router-dom";
import {UserPicture} from 'components';

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
  const history = useHistory();
  const { id } = useParams();
  const messagesEl = useRef(null);


  const backToChats = () => {
    history.push("/chats");
  };

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
    messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
  }, [id, user.token]);

  return (
    <Container className="messagesList">
      <Card className="messagesList__card">
        <Card.Header as="h3" className="messagesList__header">
          <Button
            variant="outline-warning"
            onClick={backToChats}
            className="messagesList__close"
          >
            {"<"}
          </Button>
          <UserPicture user={user}/>Piotr Kowalski
        </Card.Header>
        <Card.Body className="messagesList__body">
          <ListGroup ref={messagesEl} className="messagesList__list">
            {dataD.map(({ content, send, side, id }) => (
              <MessageItem key={id} content={content} send={send} side={side} />
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MessagesList;

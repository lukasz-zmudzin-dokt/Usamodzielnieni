import React, { useState, useEffect, useContext, useRef } from "react";
import { ListGroup, Container, Card, Button } from "react-bootstrap";
import MessageItem from "./components/MessageItem";
import { ChatForm } from "./components";
import proxy from "config/api";
import { UserContext, AlertContext } from "context";
import { useParams, useHistory } from "react-router-dom";
import { UserPicture } from "components";
//import {sendMessage} from "./functions/apiCalls";

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

const sendMessage = async (token, id, msg, data, setData) => {
  const url = proxy.chat + `${id}/`;
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "POST", body: msg, headers });
  //const response = {status: 200};

  if (response.status === 200) {
    let newData = data.slice();
    newData.push({
      content: msg,
      send: "11:55 12.03.2020",
      side: "right",
      id: 0,
    });
    setData(newData);
  } else {
    throw response.status;
  }
}

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
  const alertC = useRef(useContext(AlertContext));
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
        alertC.current.showAlert("Nie udało się załadować wiadomości.");
        res = [];
      }
      setData(res);
    };
    loadMessages(user.token, id);
    messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
  }, [id, user.token]);
  console.log(data);
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
          <UserPicture user={user} />
          <span className="ml-2">Piotr Kowalski</span>
        </Card.Header>
        <Card.Body className="messagesList__body">
          <ListGroup ref={messagesEl} className="messagesList__list">
            {dataD.map(({ content, send, side, id }) => (
              <MessageItem key={id} content={content} send={send} side={side} />
            ))}
          </ListGroup>
        </Card.Body>
        {/*<ChatForm sendMessage={msg => console.log(msg)}/>*/}
        <ChatForm sendMessage={msg => sendMessage(user.token, id, msg, data, setData)}/>
      </Card>
      
    </Container>
  );
};

export default MessagesList;

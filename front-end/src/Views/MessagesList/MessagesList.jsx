import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { ListGroup, Container, Card, Button } from "react-bootstrap";
import MessageItem from "./components/MessageItem";
import { ChatForm } from "./components";
import proxy from "config/api";
import { UserContext, AlertContext, ChatContext } from "context";
import { useParams, useHistory } from "react-router-dom";
import { UserPicture } from "components";

const getMessages = async (token, id) => {
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };
  const url = `${proxy.chat}${id}/`;
  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json();
  } else {
    throw response.status;
  }
};

const sendMessage = async (
  msg,

  alertC,
  socket,
  user,
  messagesEl
) => {
  const message = {
    message: msg,
    recipient: user.data.username,
  };

  socket.current.send(JSON.stringify(message));
  messagesEl.current.scrollTop = messagesEl.current.scrollHeight;

  socket.current.onerror = (e) => {
    alertC.current.showAlert("Wystąpił błąd.");
  };
};

const MessagesList = () => {
  const [data, setData] = useState([]);
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
  const history = useHistory();
  const { id } = useParams();
  const messagesEl = useRef(null);
  const socket = useRef(null);
  const [contact, setContact] = useState({});
  const chatC = useContext(ChatContext);
  const [loading, setLoading] = useState(false);
  const [isSocket, setIsSocket] = useState(false);

  const backToChats = () => {
    history.push("/chats");
  };

  const mapRes = useCallback(
    (res) => {
      const array = res.map((item) => {
        const time = new Date(item.timestamp);
        return {
          content: item.message,
          side: item.sender.username === user.data.username ? "right" : "left",
          send: time.toLocaleString(),
          id: item.timestamp,
        };
      });
      return array;
    },
    [user.data.username]
  );

  const mapAnswer = useCallback(
    (answer) => {
      return {
        content: answer.message,
        side: answer.username === user.data.username ? "right" : "left",
        send: new Date(answer.timestamp).toLocaleString(),
        id: answer.timestamp,
      };
    },
    [user.data.username]
  );

  const checkPhoto = useCallback(
    (res) => {
      if (res.first.username === user.data.username) {
        setContact({ data: { ...res.second } });
      } else {
        setContact({ data: { ...res.first } });
      }
    },
    [user.data.username]
  );

  useEffect(() => {
    const loadMessages = async (token, id) => {
      let res;
      setLoading(true);
      try {
        res = await getMessages(token, id);

        setData(mapRes(res.messages));
        checkPhoto(res);
        messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
        setLoading(false);
      } catch (e) {
        console.log(e);
        alertC.current.showAlert("Nie udało się załadować wiadomości.");
        res = [];
        setLoading(false);
      }
    };
    if (isSocket) {
      loadMessages(user.token, id);
      messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
    }
  }, [checkPhoto, id, isSocket, mapRes, user.data.username, user.token]);

  useEffect(() => {
    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }
    if (user.token && user.type) {
      const url = proxy.wsChat + id + "/";

      try {
        socket.current = new WebSocket(url, user.token);
        socket.current.onopen = (e) => {
          setIsSocket(true);
          messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
        };
        socket.current.onmessage = (object) => {
          chatC.loadMessages(user.token);
          setData((prevState) => [
            ...prevState,
            mapAnswer(JSON.parse(JSON.parse(object.data))),
          ]);
          if (messagesEl.current) {
            messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
          }
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [chatC, id, mapAnswer, mapRes, user.token, user.type]);

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
          <UserPicture user={contact} />
          <span className="ml-2 messagesList__user">{id}</span>
        </Card.Header>
        <Card.Body className="messagesList__body">
          <ListGroup ref={messagesEl} className="messagesList__list">
            {data.map(({ content, send, side, id }) => (
              <MessageItem key={id} content={content} send={send} side={side} />
            ))}
          </ListGroup>
        </Card.Body>
        <ChatForm
          loading={loading}
          sendMessage={(msg) =>
            sendMessage(msg, alertC, socket, contact, messagesEl)
          }
        />
      </Card>
    </Container>
  );
};

export default MessagesList;

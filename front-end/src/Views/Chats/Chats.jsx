import React, { useState, useEffect, useContext,useRef } from 'react';
import { Container, Card, ListGroup, Alert } from 'react-bootstrap';
import { UserContext,AlertContext } from 'context';
import proxy from 'config/api';
import { ChatInfo } from './components';

const getChats = async (token) => {
  let url = `${proxy.chat}/list`; // TODO
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then(chats => mapChats(chats));
  } else {
    throw response.status;
  }
}

const mapChats = (chats) => chats.map(chat => ({
  id: chat.id,
  name: chat.name,
  user: chat.user
  // TODO
}))

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [isChatsLoading, setIsChatsLoading] = useState(false);

  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));

  useEffect(() => {
    const loadChats = async token => {
      setIsChatsLoading(true);
      let loadedChats;
      try {
        loadedChats = await getChats(token);
      } catch (e) {
        console.log(e);
        loadedChats = [];
        alertC.current.showAlert("Wystąpił błąd podczas ładowania wiadomości.");
      }
      setChats(loadedChats);
      setIsChatsLoading(false);
    };
    loadChats(user.token);
  }, [user.token]);

  const msg = isChatsLoading ? <Alert variant="info">Ładowanie wiadomości...</Alert> :
              chats.length === 0 && <Alert variant="info">Brak wiadomości.</Alert>;

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Najnowsze wiadomości</Card.Header>
        {msg ? <Card.Body className="chats__body">{msg}</Card.Body> : (
          <ListGroup variant="flush">
            {chats.map((chat) => (
              <ListGroup.Item key={chat.id}>
                <ChatInfo chat={chat} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>
    </Container>
  );
}

export default Chats;
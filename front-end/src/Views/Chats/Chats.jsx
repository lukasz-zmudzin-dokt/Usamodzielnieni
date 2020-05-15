import React, { useState, useEffect, useContext, Fab } from 'react';
import { Container, Card, ListGroup, Alert, Modal, Button } from 'react-bootstrap';
import { UserContext } from 'context';
import proxy from 'config/api';
import { ChatInfo, ContactsModalContent } from './components';
//import { ChatForm } from 'components';

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
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const user = useContext(UserContext);

  useEffect(() => {
    const loadChats = async token => {
      setIsChatsLoading(true);
      let loadedChats;
      try {
        loadedChats = await getChats(token);
      } catch (e) {
        console.log(e);
        loadedChats = [];
        setError(true);
      }
      setChats(loadedChats);
      setIsChatsLoading(false);
    };
    loadChats(user.token);
  }, [user.token]);

  const msg = error ? <Alert variant="danger">Wystąpił błąd podczas ładowania wiadomości.</Alert> :
    isChatsLoading ? <Alert variant="info">Ładowanie wiadomości...</Alert> :
      chats.length === 0 && <Alert variant="info">Brak wiadomości.</Alert>;

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Najnowsze wiadomości</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleShow}>
            Nowa wiadomość
          </Button>
        </Card.Body>
        {msg ? <Card.Body className="chats__body">{msg}</Card.Body> : (
          <ListGroup variant="flush">
            {chats.map((chat) => (
              <ListGroup.Item key={chat.id}>
                <ChatInfo chat={chat} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {/*<ChatForm sendMessage={msg=>console.log(msg)}/>*/}
      </Card>
      <Modal show={show} onHide={handleClose} dialogClassName="newmsg-modal" scrollable="true">
        <Modal.Header closeButton>
          <Modal.Title>Wybierz osobę</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactsModalContent />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Chats;
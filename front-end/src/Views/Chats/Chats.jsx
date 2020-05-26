import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  ListGroup,
  Alert,
  Modal,
  Button,
} from "react-bootstrap";
import { UserContext, ChatContext } from "context";
import proxy from "config/api";
import { ChatInfo, ContactsModalContent } from "./components";
import { Pagination } from "components";
import { useLocation } from "react-router-dom";
import qs from "query-string";

const Chats = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const location = useLocation();
  const user = useContext(UserContext);
  const chatC = useContext(ChatContext);

  const { chats, error, count, loadMoreMessages, isChatsLoading } = chatC;

  const msg = error ? (
    <Alert variant="danger">Wystąpił błąd podczas ładowania wiadomości.</Alert>
  ) : isChatsLoading ? (
    <Alert variant="info">Ładowanie wiadomości...</Alert>
  ) : (
    chats.length === 0 && <Alert variant="info">Brak wiadomości.</Alert>
  );

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Najnowsze wiadomości</Card.Header>
        <Card.Body>
          <Button
            className="float-right"
            variant="primary"
            onClick={handleShow}
          >
            Nowa wiadomość
          </Button>
        </Card.Body>
        {msg && chats ? (
          <Card.Body className="chats__body">{msg}</Card.Body>
        ) : (
          <ListGroup variant="flush">
            {chats.map((chat) => (
              <ListGroup.Item key={chat.id}>
                <ChatInfo chat={chat} user={user} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Card.Footer>
          {chats.length < count ? (
            <Button onClick={loadMoreMessages}>Załaduj</Button>
          ) : null}
        </Card.Footer>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="contacts-modal"
        scrollable="true"
      >
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
};

export default Chats;

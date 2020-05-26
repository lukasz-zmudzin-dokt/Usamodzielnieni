import React, { useState, useEffect, useContext } from "react";
import { Container, Card, ListGroup, Alert, Button } from "react-bootstrap";
import { UserContext, ChatContext } from "context";

import { ChatInfo } from "./components";
import { Pagination } from "components";
import { useLocation } from "react-router-dom";
import qs from "query-string";

const Chats = () => {
  const [isChatsLoading, setIsChatsLoading] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const location = useLocation();
  const user = useContext(UserContext);
  const chatC = useContext(ChatContext);

  const { chats, error, count, loadMoreMessages } = chatC;

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
    </Container>
  );
};

export default Chats;

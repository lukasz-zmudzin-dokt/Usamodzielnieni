import React, { useState, useEffect, useContext } from "react";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";
import { UserContext } from "context";
import proxy from "config/api";
import { ChatInfo } from "./components";
import { Pagination } from "components";
import { useLocation } from "react-router-dom";
import qs from "query-string";

const getChats = async (token, filters) => {
  let url = `${proxy.chat}?page=${filters.page}&page_size=${filters.pageSize}`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then((chats) => chats);
  } else {
    throw response.status;
  }
};

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const location = useLocation();
  const user = useContext(UserContext);

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  useEffect(() => {
    const loadChats = async (token) => {
      setIsChatsLoading(true);
      let loadedChats;
      try {
        loadedChats = await getChats(token, filters);
      } catch (e) {
        console.log(e);
        loadedChats = [];
        setError(true);
      }
      setChats(loadedChats.results);
      setCount(loadedChats.count);
      setIsChatsLoading(false);
    };
    loadChats(user.token);
  }, [filters, user.token]);

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
        {msg ? (
          <Card.Body className="chats__body">{msg}</Card.Body>
        ) : (
          <ListGroup variant="flush">
            {chats.map((chat) => (
              <ListGroup.Item key={chat.id}>
                <ChatInfo chat={chat} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Card.Footer>
          <Pagination
            current={filters.page}
            max={Math.ceil(count / filters.pageSize)}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Chats;

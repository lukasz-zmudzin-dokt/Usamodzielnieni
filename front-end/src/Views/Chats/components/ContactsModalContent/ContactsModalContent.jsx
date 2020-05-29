import React, { useState, useEffect, useContext } from "react";
import { Container, ListGroup, Alert, Row } from "react-bootstrap";
import { UserContext } from "context";
import proxy from "config/api";
import Contact from "./Contact";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { Pagination } from "components";

const getContacts = async (token, filters) => {
  let url = `${proxy.chat}contacts/?page=${filters.page}&page_size=${filters.pageSize}`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json();
  } else if (response.status === 2137) {
    return response.json();
  } else {
    throw response.status;
  }
};

const mapContacts = (contacts) => {
  return contacts.map((contact) => ({
    data: {
      username: contact.username,
      first_name: contact.first_name,
      last_name: contact.last_name,
      role: contact.role,
      picture_url: contact.picture_url,
    },
  }));
};

const ContactsModalContent = () => {
  const [contacts, setContacts] = useState([]);
  const [isContactsLoading, setisContactsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 5,
  });
  const user = useContext(UserContext);

  useEffect(() => {
    const loadContacts = async (token) => {
      setisContactsLoading(true);
      let loadedContacts;
      try {
        loadedContacts = await getContacts(token, filters);
      } catch (e) {
        loadedContacts = [];
        setError(true);
        console.log(e);
      }
      setContacts(mapContacts(loadedContacts.results));
      setCount(loadedContacts.count);
      setisContactsLoading(false);
    };
    loadContacts(user.token);
  }, [count, filters, user.token]);

  const msg = error ? (
    <Alert variant="danger">Nie można załadować kontaktów</Alert>
  ) : isContactsLoading ? (
    <Alert variant="info">Ładowanie listy kontaktów</Alert>
  ) : undefined;

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  return (
    <Container>
      {msg ? (
        <Row>{msg}</Row>
      ) : (
        <ListGroup variant="flush">
          {contacts.map((contact) => (
            <ListGroup.Item key={contact.data.username}>
              <Contact contact={contact} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Pagination
        current={filters.page}
        max={Math.ceil(count / filters.pageSize)}
      />
    </Container>
  );
};

export default ContactsModalContent;

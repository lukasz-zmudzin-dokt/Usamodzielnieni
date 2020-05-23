import React, { useState, useEffect, useContext } from "react";
import { Container, ListGroup, Alert, Row } from "react-bootstrap";
import { UserContext } from "context";
import proxy from "config/api";
import  Contact  from "./Contact";

const getContacts = async (token) => {
  let url = `${proxy.chat}/contacts`; // nie ma endpointu
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response === 200) {
    return response.json().then((contacts) => mapContacts(contacts));
  } else {
    throw response.status;
  }
};

const mapContacts = (contacts) =>
  contacts.map((contact) => ({
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    role: contact.role,
    // tu nie ma modelu
  }));

const ContactsModalContent = () => {
  const [contacts, setContacts] = useState([]);
  const [isContactsLoading, setisContactsLoading] = useState(false);
  const [error, setError] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    const loadContacts = async (token) => {
      setisContactsLoading(true);
      let loadedContacts;
      try {
        loadedContacts = await getContacts(token);
      } catch (e) {
        loadedContacts = [];
        setError(true);
        console.log(e);
      }
      setContacts(loadedContacts);
      setisContactsLoading(false);
    };
    loadContacts(user.token);
  }, [user.token]);

  const msg = error ? (
    <Alert variant="danger">Nie można załadować kontaktów</Alert>
  ) : isContactsLoading ? (
    <Alert variant="info">Ładowanie listy kontaktów</Alert>
  ) : undefined;

  return (
    <Container>
      {msg ? (
        <Row>{msg}</Row>
      ) : (
        <ListGroup variant="flush">
          {contacts.map((contact) => (
            <ListGroup.Item key={contact.id}>
              <Contact first_name={contact.first_name} id={contact.id} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default ContactsModalContent;

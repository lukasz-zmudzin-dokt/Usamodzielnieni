import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, ListGroup, Alert } from 'react-bootstrap';
import { UserContext } from 'context';
import proxy from 'config/api';
import { Contact } from './Contact';

const getContacts = async (token) => {
    let url = `${proxy.chat}/contacts`; // nie ma endpointu 
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (response === 200) {
        return response.json().then(contacts => mapContacts(contacts));
    } else {
        throw response.status;
    }
}

const mapContacts = (contacts) => contacts.map(contact => ({
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name
    // tu nie ma modelu
}))

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
    },
        [user.token]);

    const msg = error ? <Alert variant="danger">Nie można załadować kontaktów</Alert> :
        isContactsLoading ? <Alert variant="info">Ładowanie listy kontaktów</Alert> :
            contacts.length === 0 && <Alert variant="info">Nie masz żadnych kontaktów</Alert>;

    return (
        <Container>
            <Card>
                <Card.Header>Lista kontaktów</Card.Header>
                {msg ? <Card.Body>{msg}</Card.Body> : (
                    <ListGroup variant="flush">
                        {contacts.map((contact) => (
                            <ListGroup.Item key={contact.id}>
                                <Contact contact={contact} />   
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )} 
            </Card>
        </Container>
    )
}

export default ContactsModalContent
import React from "react";
import { Card, Container, CardColumns } from "react-bootstrap";
import PhoneCard from "./components/PhoneCard";

class ContactPage extends React.Component {
  render() {
    const phoneList = [
      {
        name: "Telefon Zaufania Dla Dzieci i Młodzieży",
        phone: "116 111",
      },
      {
        name: "Telefon Zaufania dla Osób Dorosłych w Kryzysie Emocjonalnym",
        phone: "116 123",
      },
      {
        name: 'Ogólnopolski Telefon Zaufania "Narkotyki – Narkomania"',
        phone: "801 199 990",
      },
      {
        name: 'Telefon Zaufania "Uzależnienia behawioralne"',
        phone: "801 889 880",
      },
      {
        name: "Linia wsparcia dla osób w stanie kryzysu psychicznego",
        phone: "800 70 22 22",
      },
    ];

    return (
      <Container>
        <Card className="contact_page_card">
          <Card.Header as="h2" className="contact_page_title">
            Lista przydatnych telefonów
          </Card.Header>
          <Card.Body className="bg_card">
            <CardColumns>
              {phoneList.map((contact) => (
                <PhoneCard
                  key={contact.name + contact.phone}
                  name={contact.name}
                  number={contact.phone}
                />
              ))}
            </CardColumns>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default ContactPage;

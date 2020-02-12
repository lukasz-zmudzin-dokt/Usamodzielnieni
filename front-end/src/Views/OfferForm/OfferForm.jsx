import React, { useState } from "react";
import { Form, Container, Card, Button } from "react-bootstrap";
import FormGroup from "Views/OfferForm/components/FormGroup";
import "./style.css";

const voivodeship = [
  "Zachodnio-pomorskie",
  "Pomorskie",
  "Warmińsko-Mazurskie",
  "Podlaskie",
  "Lubuskie",
  "Wielkopolskie",
  "Kujawsko-pomorskie",
  "Mazowieckie",
  "Lubelskie",
  "Dolnośląskie",
  "Łódzkie",
  "Opolskie",
  "Świętokrzystkie",
  "Śląskie",
  "Małopolskie",
  "Podkarpackie"
];

const OfferForm = () => {
  const [positionName, setPositionName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [location, setLocation] = useState("");
  const [VS, setVS] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const submit = event => {
    event.preventDefault();
    const offerObject = {
      positionName,
      firmName,
      location,
      VS,
      description,
      date
    };
    console.log(offerObject);
  };

  return (
    <Container className="offerForm">
      <Card>
        <Card.Header as="h2">Dodaj ofertę</Card.Header>
        <Card.Body>
          <Form onSubmit={submit}>
            <FormGroup header="Nazwa stanowiska" setVal={setPositionName} />
            <FormGroup header="Nazwa firmy" setVal={setFirmName} />
            <FormGroup header="Lokalizacja" setVal={setLocation} />
            <FormGroup
              header="Województwo"
              array={voivodeship}
              type="select"
              setVal={setVS}
            />
            <FormGroup
              header="Opis stanowiska"
              type="textarea"
              setVal={setDescription}
            />
            <FormGroup header="Data ważności" type="date" setVal={setDate} />
            <Button type="submit">Wyślij</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OfferForm;

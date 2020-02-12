import React, { useState } from "react";
import { Form, Container, Card } from "react-bootstrap";
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

  return (
    <Container className="offerForm">
      <Card>
        <Card.Header as="h2">Dodaj ofertę</Card.Header>
        <Card.Body>
          <Form>
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
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OfferForm;

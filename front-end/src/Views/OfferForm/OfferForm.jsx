import React, { useState } from "react";
import { Form, Container, Card, Button, Row } from "react-bootstrap";
import FormGroup from "Views/OfferForm/components/FormGroup";
import "./style.css";

const data = [
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
      <Card className="offerForm__card">
        <Card.Header as="h2" className="offerForm__header">
          Dodaj ofertę
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submit} className="offerForm__form">
            <div className="offerForm__wrapper">
              <FormGroup header="Nazwa stanowiska" setVal={setPositionName} />
              <FormGroup header="Nazwa firmy" setVal={setFirmName} />
              <FormGroup header="Lokalizacja" setVal={setLocation} />
              <FormGroup
                header="Województwo"
                array={data}
                type="select"
                setVal={setVS}
              />
            </div>
            <div className="offerForm__wrapper">
              <FormGroup
                header="Opis stanowiska"
                type="textarea"
                setVal={setDescription}
              />
              <FormGroup header="Data ważności" type="date" setVal={setDate} />
            </div>
            <Row className="w-100 justify-content-center align-items-center m-0">
              <Button
                variant="secondary"
                type="submit"
                className="pl-5 pr-5 pt-2 pb-2"
              >
                Dodaj
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OfferForm;

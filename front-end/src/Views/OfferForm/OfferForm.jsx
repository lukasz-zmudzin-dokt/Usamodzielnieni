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
  const [offer_name, setOfferName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_adress, setCompanAdress] = useState("");
  const [voivodeship, setVoivodeship] = useState("Dolnośląskie");
  const [description, setDescription] = useState("");
  const [expiration_date, setExpirationDate] = useState("");

  const submit = event => {
    event.preventDefault();
    const offerObject = {
      offer_name,
      company_name,
      company_adress,
      voivodeship,
      expiration_date,
      description
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
              <FormGroup
                header="Nazwa stanowiska"
                setVal={setOfferName}
                incorrect="Podaj nazwę stanowiska"
              />
              <FormGroup
                header="Nazwa firmy"
                setVal={setCompanyName}
                incorrect="Podaj nazwę firmy"
              />
              <FormGroup
                header="Adres firmy"
                setVal={setCompanAdress}
                incorrect="Podaj lokalizację"
              />
              <FormGroup
                header="Województwo"
                array={data}
                type="select"
                setVal={setVoivodeship}
              />
            </div>
            <div className="offerForm__wrapper">
              <FormGroup
                header="Opis stanowiska"
                type="textarea"
                setVal={setDescription}
                incorrect="Podaj opis"
              />
              <FormGroup
                header="Ważne do:"
                type="date"
                setVal={setExpirationDate}
                incorrect="Podaj datę ważności"
              />
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

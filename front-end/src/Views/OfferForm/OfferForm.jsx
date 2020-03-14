import React, { useState, useContext } from "react";
import { Form, Container, Card, Button, Row } from "react-bootstrap";
import { voivodeships } from "constants/voivodeships";
import FormGroup from "Views/OfferForm/components/FormGroup";
import { UserContext } from "context";
import "./style.css";

const OfferForm = () => {
  const [validated, setValidated] = useState(false);
  const [send, setSend] = useState(false);

  const [offer_name, setOfferName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_address, setCompanAdress] = useState("");
  const [voivodeship, setVoivodeship] = useState(voivodeships[0]);
  const [description, setDescription] = useState("");
  const [expiration_date, setExpirationDate] = useState("");

  const context = useContext(UserContext);

  const sendData = () => {
    const url = "https://usamo-back.herokuapp.com/job/job-offer/";
    const year = expiration_date.getFullYear();
    const month =
      expiration_date.getMonth() + 1 < 10
        ? `0${expiration_date.getMonth() + 1}`
        : expiration_date.getMonth() + 1;
    const day =
      expiration_date.getDate() < 10
        ? `0${expiration_date.getDate()}`
        : expiration_date.getDate();
    const newDate = `${year}-${month}-${day}`;

    console.log({
      offer_name,
      company_name,
      company_address,
      voivodeship,
      expiration_date: newDate,
      description
    });

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        offer_name,
        company_name,
        company_address,
        voivodeship,
        expiration_date: newDate,
        description
      }),
      headers: {
        "Content-Type": "application/json",
        Origin: null,
        Authorization: `Token ${context.token}`
      }
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        setOfferName("");
        setCompanAdress("");
        setCompanyName("");
        setVoivodeship(voivodeships[0]);
        setDescription("");
        setExpirationDate("");
        setValidated(false);
        setSend(true);
      }
    });
  };

  const submit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setSend(false);
    } else {
      sendData();
    }
    setValidated(true);
  };

  return (
    <Container className="offerForm">
      <Card className="offerForm__card">
        <Card.Header as="h2" className="offerForm__header">
          Dodaj ofertę
        </Card.Header>
        <Card.Body>
          <Form
            onSubmit={submit}
            noValidate
            validated={validated}
            className="offerForm__form"
          >
            <div className="offerForm__wrapper">
              <FormGroup
                header="Nazwa stanowiska"
                setVal={setOfferName}
                val={offer_name}
                incorrect="Podaj nazwę stanowiska"
              />
              <FormGroup
                header="Nazwa firmy"
                setVal={setCompanyName}
                val={company_name}
                incorrect="Podaj nazwę firmy"
              />
              <FormGroup
                header="Adres firmy"
                setVal={setCompanAdress}
                val={company_address}
                incorrect="Podaj lokalizację"
              />
              <FormGroup
                header="Województwo"
                array={voivodeships}
                type="select"
                setVal={setVoivodeship}
                val={voivodeship}
              />
            </div>
            <div className="offerForm__wrapper">
              <FormGroup
                header="Opis stanowiska"
                type="textarea"
                setVal={setDescription}
                val={description}
                incorrect="Podaj opis"
              />
              <FormGroup
                header="Ważne do:"
                type="date"
                setVal={setExpirationDate}
                val={expiration_date}
              />
            </div>
            {send === true ? (
              <p className="offerForm__message">Dodano ofertę pracy</p>
            ) : null}
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

import React, { useState, useContext, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import { Form, Container, Card, Button, Row, Alert } from "react-bootstrap";
import { voivodeships } from "constants/voivodeships";
import FormGroup from "components/FormGroup";
import { sendData, getSelects } from "Views/OfferForm/functions/fetchData";
import { UserContext } from "context";
import "./style.css";
import polish from "date-fns/locale/pl";
import { useHistory } from "react-router-dom";

registerLocale("pl", polish);

const OfferForm = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [fail, setFail] = useState(false);
  const [arrays, setArrays] = useState({});

  const [offer, setOffer] = useState({
    offer_name: "",
    company_name: "",
    company_address: "",
    voivodeship: voivodeships[0],
    description: "",
    expiration_date: "",
    category: "",
    type: ""
  });

  const context = useContext(UserContext);

  useEffect(() => {
    const loadSelects = async token => {
      let res;
      try {
        res = await getSelects(token);
      } catch (e) {
        console.log(e);
        res = { categories: [], types: [] };
      }
      setArrays(res);
    };
    loadSelects(context.token);
  }, [context.token]);

  const submit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
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
      sendData({ ...offer, expiration_date: newDate }, context.token)
        .then(() => {
          clearState();
          history.push("/myOffers");
        })
        .catch(() => {
          console.log("tutaj");
          setFail(true);
        });
    }
    setValidated(true);
  };

  const clearState = () => {
    setOffer({
      offer_name: "",
      company_name: "",
      company_address: "",
      voivodeship: voivodeships[0],
      description: "",
      expiration_date: "",
      category: "",
      type: ""
    });
    setValidated(false);
  };

  const {
    offer_name,
    company_address,
    company_name,
    description,
    expiration_date,
    voivodeship,
    category,
    type
  } = offer;

  return (
    <Container className="offerForm">
      <Card className="offerForm__card">
        <Card.Header as="h2" className="offerForm__header">
          Dodaj ofertę
        </Card.Header>
        <Card.Body>
          <Form
            data-testid="form"
            onSubmit={submit}
            noValidate
            validated={validated}
            className="offerForm__form"
          >
            <div className="offerForm__wrapper">
              <FormGroup
                header="Nazwa stanowiska"
                setVal={val => setOffer({ ...offer, offer_name: val })}
                val={offer_name}
                incorrect="Podaj nazwę stanowiska"
                length={{ min: 1, max: 50 }}
                id="offer_name"
                required
              />
              <FormGroup
                header="Nazwa firmy"
                id="company_name"
                setVal={val => setOffer({ ...offer, company_name: val })}
                val={company_name}
                incorrect="Podaj nazwę firmy"
                length={{ min: 1, max: 70 }}
                required
              />
              <FormGroup
                header="Adres firmy"
                id="company_address"
                setVal={val => setOffer({ ...offer, company_address: val })}
                val={company_address}
                incorrect="Podaj lokalizację"
                length={{ min: 1, max: 200 }}
                required
              />
              <FormGroup
                header="Województwo"
                id="voivodeship"
                array={voivodeships}
                type="select"
                setVal={val => setOffer({ ...offer, voivodeship: val })}
                val={voivodeship}
                required
              />
              <FormGroup
                header="Wymiar pracy"
                id="type"
                setVal={val => setOffer({ ...offer, type: val })}
                val={type}
                type="select"
                array={arrays.types}
                required
                incorrect="Podaj wymiar pracy np. staż,praca"
              />
            </div>
            <div className="offerForm__wrapper">
              <FormGroup
                header="Opis stanowiska"
                id="description"
                type="textarea"
                setVal={val => setOffer({ ...offer, description: val })}
                val={description}
                incorrect="Podaj opis"
                length={{ min: 1, max: 1000 }}
                required
              />
              <FormGroup
                header="Branża"
                id="category"
                setVal={val => setOffer({ ...offer, category: val })}
                val={category}
                type="select"
                array={arrays.categories}
                required
                incorrect="Podaj branżę np. IT, marketing"
              />
              <FormGroup
                header="Ważne do:"
                id="expiration_date"
                type="date"
                setVal={val => setOffer({ ...offer, expiration_date: val })}
                val={expiration_date}
                required
              />
            </div>
            {fail === true ? (
              <Row className="w-100 justify-content-center align-items-center m-0">
                <Alert data-testid="fail" variant="danger">
                  Coś poszło nie tak. Spróbuj ponownie póżniej.
                </Alert>
              </Row>
            ) : null}
            <Row className="w-100 justify-content-center align-items-center m-0">
              <Button
                variant="secondary"
                type="submit"
                className=""
                data-testid="submitBtn"
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
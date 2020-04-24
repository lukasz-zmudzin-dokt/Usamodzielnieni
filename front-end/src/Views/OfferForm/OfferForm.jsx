import React, { useState, useContext, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import { Form, Container, Card, Button, Row, Alert } from "react-bootstrap";
import { voivodeships } from "constants/voivodeships";
import FormGroup from "components/FormGroup";
import {
  sendData,
  getSelects,
  getOffer,
} from "Views/OfferForm/functions/fetchData";
import { UserContext } from "context";
import polish from "date-fns/locale/pl";
import { useHistory, useParams } from "react-router-dom";

registerLocale("pl", polish);

const OfferForm = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [fail, setFail] = useState(false);
  const [arrays, setArrays] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  let { id } = useParams();

  const [offer, setOffer] = useState({
    offer_name: "",
    company_name: "",
    company_address: "",
    voivodeship: voivodeships[0],
    description: "",
    expiration_date: "",
    category: "",
    type: "",
  });

  //47991e86-4b42-4507-b154-1548bf8a3bd3
  const context = useContext(UserContext);

  useEffect(() => {
    setDisabled(true);
    const loadOffer = async (token) => {
      let res;
      try {
        res = await getOffer(token, id);
        setOffer({
          offer_name: res.offer_name,
          company_name: res.company_name,
          company_address: res.company_address,
          voivodeship: res.voivodeship,
          description: res.description,
          expiration_date: new Date(res.expiration_date),
          category: res.category,
          type: res.type,
        });
      } catch (e) {
        console.log(e);
        setFail(true);
        setMessage(
          "Nie udało się załadować oferty pracy o danym identyfikatorze"
        );
        res = { categories: [], types: [] };
      }
    };
    const loadSelects = async (token) => {
      let res;
      try {
        res = await getSelects(token);
        console.log(res);
        if (!id) {
          setOffer({
            offer_name: "",
            company_name: context.data.company_name,
            company_address: context.data.company_address,
            voivodeship: voivodeships[0],
            description: "",
            expiration_date: "",
            category: res.categories[0],
            type: res.types[0],
          });
        }
        setArrays(res);
      } catch (e) {
        console.log(e);
        setFail(true);
        setMessage("Nie udało się załadować danych");
        res = { categories: [], types: [] };
      }

      setDisabled(false);
    };
    loadSelects(context.token);
    if (id) {
      loadOffer(context.token);
    }
  }, [
    context.data.company_address,
    context.data.company_name,
    context.token,
    id,
  ]);

  const submit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setDisabled(true);
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
      sendData({ ...offer, expiration_date: newDate }, context.token, id)
        .then(() => {
          history.push("/myOffers");
        })
        .catch(() => {
          setFail(true);
          setDisabled(false);
        });
    }
    setValidated(true);
  };

  const {
    offer_name,
    company_address,
    company_name,
    description,
    expiration_date,
    voivodeship,
    category,
    type,
  } = offer;

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
                setVal={(val) => setOffer({ ...offer, offer_name: val })}
                val={offer_name}
                incorrect="Podaj nazwę stanowiska"
                length={{ min: 1, max: 50 }}
                id="offer_name"
                required
              />
              <FormGroup
                header="Nazwa firmy"
                id="company_name"
                setVal={(val) => setOffer({ ...offer, company_name: val })}
                val={company_name}
                incorrect="Podaj nazwę firmy"
                length={{ min: 1, max: 70 }}
                required
                disabled
              />
              <FormGroup
                header="Adres firmy"
                id="company_address"
                setVal={(val) => setOffer({ ...offer, company_address: val })}
                val={company_address}
                incorrect="Podaj lokalizację"
                length={{ min: 1, max: 200 }}
                required
                disabled
              />
              <FormGroup
                header="Województwo"
                id="voivodeship"
                array={voivodeships}
                type="select"
                setVal={(val) => setOffer({ ...offer, voivodeship: val })}
                val={voivodeship}
                required
              />
              <FormGroup
                header="Wymiar pracy"
                id="type"
                setVal={(val) => setOffer({ ...offer, type: val })}
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
                setVal={(val) => setOffer({ ...offer, description: val })}
                val={description}
                incorrect="Podaj opis"
                length={{ min: 1, max: 1000 }}
                required
              />
              <FormGroup
                header="Branża"
                id="category"
                setVal={(val) => setOffer({ ...offer, category: val })}
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
                setVal={(val) => setOffer({ ...offer, expiration_date: val })}
                val={expiration_date}
                required
              />
            </div>
            {fail === true ? (
              <Row className="w-100 justify-content-center align-items-center m-0">
                <Alert variant="danger">{message}</Alert>
              </Row>
            ) : null}
            <Row className="w-100 justify-content-center align-items-center m-0">
              <Button
                variant="primary"
                type="submit"
                className=""
                disabled={disabled}
              >
                {disabled ? "Ładowanie..." : "Dodaj"}
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OfferForm;

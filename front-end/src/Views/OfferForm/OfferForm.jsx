import React, { useState, useContext, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import { Form, Container, Card, Button, Row, Alert, InputGroup } from "react-bootstrap";
import { voivodeships } from "constants/voivodeships";
import FormGroup from "components/FormGroup";
import { sendData, getSelects } from "Views/OfferForm/functions/fetchData";
import { UserContext } from "context";
import polish from "date-fns/locale/pl";
import { useHistory } from "react-router-dom";

registerLocale("pl", polish);

const OfferForm = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [fail, setFail] = useState(false);
  const [arrays, setArrays] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [isPayValid, setIsPayValid] = useState(true)

  const [offer, setOffer] = useState({
    offer_name: "",
    company_name: "",
    company_address: "",
    voivodeship: voivodeships[0],
    description: "",
    expiration_date: "",
    category: "",
    type: "",
    pay_from: 0,
    pay_to: 0,
    pay_period: ""
  });

  const context = useContext(UserContext);

  useEffect(() => {
    setDisabled(true);
    const loadSelects = async (token) => {
      let res;
      try {
        res = await getSelects(token);
      } catch (e) {
        console.log(e);
        setFail(true);
        res = { categories: [], types: [] };
      }
      setArrays(res);
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
      setDisabled(false);
    };
    loadSelects(context.token);
  }, [context.data.company_address, context.data.company_name, context.token]);

  const submit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (pay_from > pay_to) {
      setIsPayValid(false);
      event.stopPropagation();
    } else if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setIsPayValid(true);
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
      sendData({ ...offer, expiration_date: newDate }, context.token)
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


  const pay_regex = "[0-9]{1,}[.]{1}[0-9]{2}";

  const {
    offer_name,
    company_address,
    company_name,
    description,
    expiration_date,
    voivodeship,
    category,
    type,
    pay_from,
    pay_to,
    pay_period,
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
              <Form.Group id="formGroupPayfrom">
                <Form.Label>Wynagrodzenie od:</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pay_from"
                    type="text"
                    placeholder="12.00"
                    onChange={e => setOffer({ ...offer, pay_from: parseFloat(e.target.value) })}
                    pattern={pay_regex}
                    required
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>zł</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Podaj wynagrodzenie w formacie *.00
                </Form.Control.Feedback>
              </Form.Group>
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
              <FormGroup
                header="Okres wypłaty wynagrodzenia"
                id="pay_period"
                type="select"
                array={["za godzinę", "za dzień", "za miesiąc", "za rok", "jednokrotnie"]}
                setVal={(val) => setOffer({ ...offer, pay_period: val })}
                val={pay_period}
                required
              />
              <Form.Group id="formGroupPayTo">
                <Form.Label>Wynagrodzenie do:</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pay_to"
                    type="text"
                    placeholder="12.00"
                    onChange={e => setOffer({ ...offer, pay_to: parseFloat(e.target.value) })}
                    pattern={pay_regex}
                    required
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>zł</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Podaj wynagrodzenie w formacie *.00
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {fail === true ? (
              <Row className="w-100 justify-content-center align-items-center m-0">
                <Alert variant="danger">
                  Coś poszło nie tak. Spróbuj ponownie póżniej.
                </Alert>
              </Row>
            ) : null}
            {isPayValid === false ? (
              <Row className="w-100 justify-content-center align-items-center m-0">
                <Alert variant="danger">
                  Wartość 'Wynagrodzenie od:' musi być mniejsza bądź równa wartości 'Wynagrodzenie do:'
                </Alert>
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
    </Container >
  );
};

export default OfferForm;

import React, { useState, useContext, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import { Form, Container, Card, Button, Row, Alert, InputGroup } from "react-bootstrap";
import { voivodeships } from "constants/voivodeships";
import FormGroup from "components/FormGroup";
import {
  sendData,
  getCategories,
  getTypes,
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
  const [arrays, setArrays] = useState({ types: [], categories: [] });
  const [disabled, setDisabled] = useState(false);
<<<<<<< HEAD
  const [isPayValid, setIsPayValid] = useState(true);
=======
  const [message, setMessage] = useState("");
  let { id } = useParams();
>>>>>>> master

  const [offer, setOffer] = useState({
    offer_name: "",
    company_name: "",
    company_address: "",
    voivodeship: voivodeships[0],
    description: "",
    expiration_date: "",
    category: "",
    type: "",
    pay_from: "",
    pay_to: "",
    pay_period: ""
  });

  //47991e86-4b42-4507-b154-1548bf8a3bd3
  const context = useContext(UserContext);

  useEffect(() => {
    setDisabled(true);
    const loadData = async (token) => {
      let values;
      try {
        values = await Promise.all([
          getCategories(token),
          getTypes(token),
          id && getOffer(token, id),
        ]);
      } catch (err) {
        if (err.message === "getOffer") {
          history.push("/offerForm");
        } else {
          setFail(true);
          setDisabled(false);
          setMessage("Nie udało się załadować danych.");
        }
        return;
      }
      const [categories, types, loadedOffer] = values;
      const { city, street, street_number } = context.data.company_address;

      const company_address = `${city}, ${street} ${street_number}`;
      setArrays({ categories, types });
      setOffer((prev) => ({
        ...prev,
        company_address,
        company_name: context.data.company_name,
        category: categories[0],
        type: types[0],
        ...loadedOffer,
      }));
      setDisabled(false);
    };
    loadData(context.token);
  }, [
    context.data.company_address,
    context.data.company_name,
    context.token,
    history,
    id,
  ]);

  const submit = (event) => {
    const pay_from_dot = unifyPayFormat(pay_from);
    const pay_to_dot = unifyPayFormat(pay_to);
    const form = event.currentTarget;
    event.preventDefault();
    if (checkPayValidity(pay_from_dot, pay_to_dot) === false) {
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
      sendData({ ...offer, expiration_date: newDate, pay_from: pay_from_dot.replace(".", ","), pay_to: pay_to_dot.replace(".", ",") }, context.token)
        .then(() => {
          history.push("/myOffers");
        })
        .catch(() => {
          setFail(true);
          setDisabled(false);
        });
    }
    setDisabled(false);
    setValidated(true);
  };

  const unifyPayFormat = (input) => {
    if (input.match(/^\d{1,}[,\\.]{1}(\d{2})?$/) !== null) {  //jeśli input jest w formacie *.??
      let value = input.replace(",", ".");                    //zamieniemy , na . żeby zadziałało parseToFloat()
      value = value.replace(/^0+(?=\d)/, '');                 //jesli ciąg 0 na początku to usuwamy, jeśli same 0 to zostawiamy jedno
      return value;
    } else if (input.match(/^\d{1,}$/) !== null) {            //jeśli input jest liczbą całkowitą
      let value = input.concat(".00");
      value = value.replace(/^0+(?=\d)/, '');
      return value;
    } else {
      let value = input.replace(/[^]*/, "");
      return value;
    }
  };

  const checkPayValidity = (input_from, input_to) => {
    if (input_from !== undefined && input_to !== undefined) {
      if (parseFloat(input_from) <= parseFloat(input_to) && input_from !== '' && input_to !== '') {
        setIsPayValid(true);
        return true;
      }
    }
    setIsPayValid(false);
    return false;
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
                header="Okres wypłaty wynagrodzenia"
                id="pay_period"
                type="select"
                array={["za godzinę", "za dzień", "za miesiąc", "za rok", "jednokrotnie"]}
                setVal={(val) => setOffer({ ...offer, pay_period: val })}
                val={pay_period}
                required
              />
              <FormGroup
                header="Wynagrodzenie od (w PLN)"
                id="pay_from"
                setVal={(val) => setOffer({ ...offer, pay_from: val })}
                val={pay_from}
                required
              />
              <FormGroup
                header="Wynagrodzenie do (w PLN)"
                id="pay_to"
                setVal={(val) => setOffer({ ...offer, pay_to: val })}
                val={pay_to}
                required
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
                header="Wymiar pracy"
                id="type"
                setVal={(val) => setOffer({ ...offer, type: val })}
                val={type}
                type="select"
                array={arrays.types}
                required
                incorrect="Podaj wymiar pracy np. staż,praca"
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
            {isPayValid === false ? (
              <Row className="w-100 justify-content-center align-items-center m-0">
                <Alert variant="danger">
                  Wartość 'Wynagrodzenie od:' musi być mniejsza bądź równa wartości 'Wynagrodzenie do:'
                </Alert>
                <Alert variant="danger">
                  Wynagrodzenie musi być liczbą całkowitą, bądź z częścią setną
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

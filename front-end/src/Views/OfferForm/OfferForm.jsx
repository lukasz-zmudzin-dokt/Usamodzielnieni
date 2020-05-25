import React, { useState, useContext, useEffect, useRef } from "react";
import { registerLocale } from "react-datepicker";
import { Form, Container, Card, Button, Row, Alert } from "react-bootstrap";
import { voivodeships } from "constants/voivodeships";
import FormGroup from "components/FormGroup";
import {
  sendData,
  getCategories,
  getTypes,
  getOffer,
} from "Views/OfferForm/functions/fetchData";
import { UserContext, AlertContext } from "context";
import polish from "date-fns/locale/pl";
import { useHistory, useParams } from "react-router-dom";
import { addressToString } from "utils/converters";
import {staffTypes} from "constants/staffTypes";

registerLocale("pl", polish);

const OfferForm = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [arrays, setArrays] = useState({ types: [], categories: [] });
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState(false);
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
    salary_min: "",
    salary_max: "",
  });

  //47991e86-4b42-4507-b154-1548bf8a3bd3
  const context = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));
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
          alertC.current.showAlert("Wystąpił błąd przy pobieraniu oferty.");
          history.push("/offerForm");
        } else {
          setDisabled(false);
          setErr(true);
        }
        return;
      }
      const [categories, types, loadedOffer] = values;

      const company_address = addressToString(context.data.company_address);
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

  const submit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setDisabled(true);
      try {
        await sendData(
          {
            ...offer,
            company_address: context.data.company_address,
            expiration_date: expiration_date.toISOString().substr(0, 10),
            salary_min: salary_min.replace(",", "."),
            salary_max: salary_max.replace(",", "."),
          },
          context.token,
          id
        );
        history.push("/myOffers");
        return;
      } catch (e) {
        alertC.current.showAlert("Nie udało się wysłać oferty. Błąd serwera.");
      }
    }
    setDisabled(false);
    setValidated(true);
  };

  const msg = err ? (
    <Alert variant="danger">
      Wystąpił błąd w trakcie ładowania formularza.
    </Alert>
  ) : null;

  const {
    offer_name,
    company_address,
    company_name,
    description,
    expiration_date,
    voivodeship,
    category,
    type,
    salary_min,
    salary_max,
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
                val={addressToString(company_address)}
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
                header="Wynagrodzenie od (zł / miesiąc)"
                id="salary_min"
                type="number"
                setVal={(val) => setOffer({ ...offer, salary_min: val })}
                val={salary_min}
                required
                step={0.01}
                length={{ min: 0, max: offer.salary_max * 1 - 1 }}
                incorrect="Pole musi być mniejsze od maksymalnej stawki"
              />
              <FormGroup
                header="Wynagrodzenie do (zł / miesiąc)"
                id="salary_max"
                type="number"
                setVal={(val) => setOffer({ ...offer, salary_max: val })}
                val={salary_max}
                required
                step={0.01}
                length={{
                  min: offer.salary_min * 1 + 1,
                  max: 999999,
                }}
                incorrect="Pole musi być większe od minimalnej stawki"
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
              />
              <FormGroup
                header="Ważne do"
                id="expiration_date"
                type="date"
                setVal={(val) => setOffer({ ...offer, expiration_date: val })}
                val={expiration_date}
                required
              />
            </div>
            <Row className="w-100 justify-content-center align-items-center m-0">
              <Button
                variant="primary"
                type="submit"
                className=""
                data-testid="submitBtn"
                disabled={
                  context.data.group_type?.includes(staffTypes.GUEST) || disabled
                }
              >
                {disabled ? "Ładowanie..." : "Dodaj"}
              </Button>
            </Row>
          </Form>
          {msg && (
            <Row className="w-100 justify-content-center align-items-center ml-0 mb-0 mt-3">
              {msg}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OfferForm;

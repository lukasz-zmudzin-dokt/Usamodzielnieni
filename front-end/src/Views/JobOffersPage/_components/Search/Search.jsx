import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./style.css";

const voivodeships = [
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

const typeOfWork = ["Szkolenie", "Praca", "Staż"];
const earningsTab = ["Płatne", "Bezpłatne"];

const Search = ({ offers, setFilter }) => {
  const [voivodeship, setVoivodeship] = useState("-- Wybierz --");
  const [companyName, setCompanyName] = useState("-- Wybierz --");
  const [type, setType] = useState("-- Wybierz --");
  const [earnings, setEarnings] = useState("-- Wybierz --");

  const filter = event => {
    event.preventDefault();
    const filters = { voivodeship, companyName, type, earnings };
    let newTab = offers;
    let check = 0;
    for (let key in filters) {
      if (filters[key] !== "-- Wybierz --") {
        newTab = newTab.filter(val => {
          return val[key] === filters[key];
        });
      } else check++;
    }
    if (check != 4) setFilter({ tab: newTab, changed: true });
  };

  const deleteFilter = e => {
    setVoivodeship("-- Wybierz --");
    setCompanyName("-- Wybierz --");
    setType("-- Wybierz --");
    setEarnings("-- Wybierz --");
    setFilter(offers);
  };
  let companies = [...new Set(offers.map(({ companyName }) => companyName))];
  return (
    <Form className="mb-2" onSubmit={filter}>
      <div className="search__wrapper">
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Województwo</Form.Label>
          <Form.Control
            as="select"
            onChange={e => setVoivodeship(e.target.value)}
            value={voivodeship}
          >
            <option data-hidden="true" disabled>
              -- Wybierz --
            </option>
            {voivodeships.map(val => (
              <option key={val}>{val}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Firma</Form.Label>
          <Form.Control
            as="select"
            onChange={e => setCompanyName(e.target.value)}
            value={companyName}
          >
            <option data-hidden="true" disabled>
              -- Wybierz --
            </option>
            {companies.map(val => (
              <option key={val}>{val}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Szkolenie/Praca</Form.Label>
          <Form.Control
            as="select"
            onChange={e => setType(e.target.value)}
            value={type}
          >
            <option data-hidden="true" disabled>
              -- Wybierz --
            </option>
            {typeOfWork.map(val => (
              <option key={val}>{val}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Płatne/Bezpłatne</Form.Label>
          <Form.Control
            as="select"
            onChange={e => setEarnings(e.target.value)}
            value={earnings}
          >
            <option data-hidden="true" disabled>
              -- Wybierz --
            </option>
            {earningsTab.map(val => (
              <option key={val}>{val}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      <Row className="justify-content-center align-items-center m-0">
        <Button
          variant="secondary"
          type="submit"
          className="pl-4 pr-4 pt-2 pb-2 mr-5"
        >
          Filtruj
        </Button>
        <Button
          variant="secondary"
          onClick={deleteFilter}
          className="pl-4 pr-4 pt-2 pb-2"
        >
          Usuń filtr
        </Button>
      </Row>
    </Form>
  );
};

export default Search;

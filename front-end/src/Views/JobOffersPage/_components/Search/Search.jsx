import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./style.css";
import FormGroup from "components/FormGroup";
import { voivodeships } from "constants/voivodeships";

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
    for (let key in filters) {
      if (filters[key] !== "-- Wybierz --") {
        newTab = newTab.filter(val => {
          return val[key] === filters[key];
        });
      }
    }
    setFilter(newTab);
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
        <FormGroup
          header="Województwo"
          array={voivodeships}
          val={voivodeship}
          setVal={setVoivodeship}
          type="select"
        />
        <FormGroup
          header="Firma"
          array={companies}
          val={companyName}
          setVal={setCompanyName}
          type="select"
        />
        <FormGroup
          header="Szkolenie/Praca"
          array={typeOfWork}
          val={type}
          setVal={setType}
          type="select"
        />
        <FormGroup
          header="Płatne/Bezpłatne"
          array={earningsTab}
          val={earnings}
          setVal={setEarnings}
          type="select"
        />
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

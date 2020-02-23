import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
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

const Search = ({ offers }) => {
  const [voivodeship, setVoivodeship] = useState("Lubelskie");
  const [company, setCompany] = useState("");
  const filter = event => {
    event.preventDefault();
    console.log(voivodeship, company);
  };
  let companies = [...new Set(offers.map(({ companyName }) => companyName))];
  return (
    <Form className="mb-2" onSubmit={filter}>
      <div className="search__wrapper">
        {/* <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Branża</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group> */}
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Województwo</Form.Label>
          <Form.Control
            as="select"
            onChange={e => setVoivodeship(e.target.value)}
            value={voivodeship}
          >
            {data.map(val => (
              <option>{val}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Firma</Form.Label>
          <Form.Control
            as="select"
            onChange={e => setCompany(e.target.value)}
            value={company}
          >
            {companies.map(val => (
              <option>{val}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      <Row className="w-100 justify-content-center align-items-center m-0">
        <Button
          variant="secondary"
          type="submit"
          className="pl-5 pr-5 pt-2 pb-2"
        >
          Filtruj
        </Button>
      </Row>
    </Form>
  );
};

export default Search;

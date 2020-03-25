import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./style.css";
import FormGroup from "components/FormGroup";
import { voivodeships } from "constants/voivodeships";

const Search = ({ offers, setFilter }) => {
  const [voivodeship, setVoivodeship] = useState("-- Wybierz --");
  const [pageSize, setPageSize] = useState(1);
  const [minExpirationDate, setMinExpirationDate] = useState();

  const filter = event => {
    event.preventDefault();
  };

  const deleteFilter = e => {
    setVoivodeship("-- Wybierz --");
  };
  return (
    <Form className="mb-2" onSubmit={filter}>
      <div className="search__wrapper">
        <FormGroup
          header="Województwo"
          array={voivodeships}
          val={voivodeship}
          setVal={setVoivodeship}
          type="select"
          id="voivodes"
        />
        <FormGroup
          header="Minimalna data wygaśnięcia oferty"
          val={minExpirationDate}
          setVal={setMinExpirationDate}
          type="date"
          id="minExpirationDate"
        />
        <FormGroup
          header="Ilość ofert na stronie"
          val={pageSize}
          setVal={setPageSize}
          type="number"
          id="pageSize"
          length={{ min: 1, max: 100 }}
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

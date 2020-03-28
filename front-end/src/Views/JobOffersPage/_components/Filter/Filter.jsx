import React, { useState } from "react";
import { registerLocale } from "react-datepicker";
import { Form, Button, Col } from "react-bootstrap";
import "./style.css";
import FormGroup from "components/FormGroup";
import { voivodeships } from "constants/voivodeships";
import polish from "date-fns/locale/pl";
registerLocale("pl", polish);

const Filter = ({ setFilters, count }) => {
  const [voivodeship, setVoivodeship] = useState("-- Wybierz --");
  const [pageSize, setPageSize] = useState(10);
  const [minExpirationDate, setMinExpirationDate] = useState();

  const filter = event => {
    event.preventDefault();
    let newDate;
    if (minExpirationDate !== undefined) {
      const year = minExpirationDate.getFullYear();
      const month =
        minExpirationDate.getMonth() + 1 < 10
          ? `0${minExpirationDate.getMonth() + 1}`
          : minExpirationDate.getMonth() + 1;
      const day =
        minExpirationDate.getDate() < 10
          ? `0${minExpirationDate.getDate()}`
          : minExpirationDate.getDate();
      newDate = `${year}-${month}-${day}`;
    }

    const voivodeshipV =
      voivodeship !== "-- Wybierz --" ? voivodeship : undefined;
    setFilters({
      page: 1,
      voivodeship: voivodeshipV,
      pageSize,
      minExpirationDate: newDate
    });
  };

  const deleteFilter = e => {
    setVoivodeship("-- Wybierz --");
    setPageSize(10);
    setMinExpirationDate();
    setFilters({ page: 1, pageSize: 10 });
  };
  return (
    <Form className="search__form" onSubmit={filter}>
      <Form.Row>
        <FormGroup as={Col} xs={12} md={4}
          header="Województwo"
          array={voivodeships}
          val={voivodeship}
          setVal={setVoivodeship}
          type="select"
          id="voivodeship"
        />
        <FormGroup as={Col}  xs={12} md={4}
          header="Okres ważności"
          val={minExpirationDate}
          setVal={setMinExpirationDate}
          type="date"
          id="minExpirationDate"
        />

        <FormGroup as={Col} xs={12} md={4}
          header="Ilość ofert na stronie"
          val={pageSize}
          setVal={setPageSize}
          type="number"
          id="pageSize"
          length={{ min: 1, max: 100 }}
        />
      </Form.Row>

      <Button type="submit" className="mr-3" variant="primary">
        Filtruj oferty
      </Button>
      <Button variant="outline-primary" className="mr-3" onClick={deleteFilter}>
        Wyczyść filtry
      </Button>
      { count !== 0 && <small>Znaleziono {count} ofert</small>}
    </Form>
  );
};

export default Filter;

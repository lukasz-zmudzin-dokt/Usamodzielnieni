import React, { useState } from "react";
import { registerLocale } from "react-datepicker";
import { Form, Button, Row } from "react-bootstrap";
import "./style.css";
import FormGroup from "components/FormGroup";
import { voivodeships } from "constants/voivodeships";
import polish from "date-fns/locale/pl";
registerLocale("pl", polish);

const Filter = ({ setFilters }) => {
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
      <div className="search__wrapper">
        <FormGroup
          header="Województwo"
          array={voivodeships}
          val={voivodeship}
          setVal={setVoivodeship}
          type="select"
          id="voivodeship"
        />
        <FormGroup
          header="Okres ważności"
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

      <Button type="submit" className="mr-3" variant="primary">
        Filtruj oferty
      </Button>
      <Button variant="outline-primary" onClick={deleteFilter}>
        Wyczyść filtry
      </Button>
    </Form>
  );
};

export default Filter;

import React, { useState, useEffect, useContext, useRef } from "react";
import { registerLocale } from "react-datepicker";
import { Form, Button, Col } from "react-bootstrap";
import { DEFAULT_INPUT } from "constants/other";
import FormGroup from "components/FormGroup";
import { voivodeships } from "constants/voivodeships";
import polish from "date-fns/locale/pl";
import { getSelects } from "Views/OfferForm/functions/fetchData";
import { UserContext, AlertContext } from "context";
import { IndexLinkContainer } from "react-router-bootstrap";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";
import { Sort } from "../";
registerLocale("pl", polish);

const Filter = ({ setFilters, count, disabled, setSortJob }) => {
  const [voivodeship, setVoivodeship] = useState(DEFAULT_INPUT);
  const [pageSize, setPageSize] = useState(10);
  const [minExpirationDate, setMinExpirationDate] = useState();
  const [category, setCategory] = useState(DEFAULT_INPUT);
  const [type, setType] = useState(DEFAULT_INPUT);
  const [sort, setSort] = useState("");
  const [arrays, setArrays] = useState([]);
  const user = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));

  useEffect(() => {
    const loadSelects = async () => {
      let res;
      try {
        res = await getSelects();
      } catch (e) {
        console.log(e);
        res = { categories: [], types: [] };
        alertC.current.showAlert("Nie udało się pobrać filtrów.");
      }
      setArrays(res);
    };
    loadSelects();
  }, []);

  const filter = (event) => {
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
      voivodeship !== DEFAULT_INPUT ? voivodeship : undefined;
    const categoryV = category !== DEFAULT_INPUT ? category : undefined;
    const typeV = type !== DEFAULT_INPUT ? type : undefined;
    setFilters({
      page: 1,
      voivodeship: voivodeshipV,
      pageSize,
      minExpirationDate: newDate,
      category: categoryV,
      type: typeV,
    });
    setSortJob(sort);
  };

  const deleteFilter = (e) => {
    setVoivodeship(DEFAULT_INPUT);
    setPageSize(10);
    setCategory(DEFAULT_INPUT);
    setType(DEFAULT_INPUT);
    setMinExpirationDate();
    setFilters({ page: 1, pageSize: 10 });
  };
  return (
    <Form className="search__form" onSubmit={filter}>
      <Form.Row>
        <FormGroup
          as={Col}
          xs={12}
          md={4}
          header="Województwo"
          array={voivodeships}
          val={voivodeship}
          setVal={setVoivodeship}
          type="select"
          id="voivodeship"
        />
        <FormGroup
          as={Col}
          xs={12}
          md={4}
          header="Okres ważności"
          val={minExpirationDate}
          setVal={setMinExpirationDate}
          type="date"
          id="minExpirationDate"
        />
        <FormGroup
          as={Col}
          xs={12}
          md={4}
          header="Ilość ofert na stronie"
          val={pageSize}
          setVal={setPageSize}
          type="number"
          id="pageSize"
          length={{ min: 1, max: 100 }}
        />
        <FormGroup
          as={Col}
          xs={12}
          md={4}
          header="Branża"
          type="select"
          array={arrays.categories}
          val={category}
          setVal={setCategory}
          id="category"
        />
        <FormGroup
          as={Col}
          xs={12}
          md={4}
          header="Typ stanowiska"
          type="select"
          array={arrays.types}
          val={type}
          setVal={setType}
          id="type"
        />
      </Form.Row>
      <Sort sort={sort} setSort={setSort} />
      <Button
        type="submit"
        className="mr-3 mt-3 mb-3"
        variant="primary"
        disabled={disabled}
      >
        {disabled ? "Ładowanie..." : "Filtruj oferty"}
      </Button>
      <Button
        variant="outline-primary"
        className="mr-3 mt-3 mb-3"
        onClick={deleteFilter}
        disabled={disabled}
      >
        {disabled ? "Ładowanie..." : "Wyczyść filtry"}
      </Button>
      {count !== 0 && (
        <small className="search__countText mr-3">{`Ilość znalezionych ofert: ${count}`}</small>
      )}
      {user.type === userTypes.EMPLOYER &&
      user.data &&
      user.data.status === userStatuses.VERIFIED ? (
        <IndexLinkContainer as={Button} to="/offerForm">
          <Button variant="success">Dodaj ofertę</Button>
        </IndexLinkContainer>
      ) : null}
    </Form>
  );
};

export default Filter;

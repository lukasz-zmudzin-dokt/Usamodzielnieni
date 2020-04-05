import React, { useState, useEffect } from "react";
import { getFilters } from "Views/BlogPage/functions/fetchData";
import { Form, Col, Button } from "react-bootstrap";
import "./style.css";
import FormGroup from "components/FormGroup"; // to się zmieni jak job offers będą zmergowane do mastera

const Filter = ({ token, setFilter, count }) => {
  const [filters, setFilters] = useState({ categories: [], tags: [] });
  const [category, setCategory] = useState("-- Wybierz --");
  const [tag, setTag] = useState("-- Wybierz --");

  useEffect(() => {
    const loadOffers = async token => {
      let res;
      try {
        res = await getFilters(token);
      } catch (e) {
        console.log(e);
        res = { categories: [], tags: [] };
      }
      setFilters(res);
    };
    loadOffers(token);
  }, [token]);

  const filter = event => {
    event.preventDefault();

    const categoryV = category !== "-- Wybierz --" ? category : undefined;
    const tagV = tag !== "-- Wybierz --" ? tag : undefined;
    console.log(categoryV, tagV);
    setFilter({
      category: categoryV,
      tag: tagV
    });
  };

  const clearFilter = () => {
    setCategory("-- Wybierz --");
    setTag("-- Wybierz --");
    setFilter({
      category: undefined,
      tag: undefined
    });
  };

  return (
    <Form className="blog__form" onSubmit={filter}>
      <Form.Row>
        <FormGroup
          as={Col}
          xs={12}
          md={6}
          header="Kategoria"
          array={filters.categories}
          val={category}
          setVal={setCategory}
          type="select"
          id="voivodeship"
        />
        <FormGroup
          as={Col}
          xs={12}
          md={6}
          header="Tag"
          array={filters.tags}
          val={tag}
          setVal={setTag}
          type="select"
        />
      </Form.Row>

      <Button type="submit" className="mr-3" variant="primary">
        Filtruj oferty
      </Button>
      <Button variant="outline-primary" className="mr-3" onClick={clearFilter}>
        Wyczyść filtry
      </Button>
      {count !== 0 && (
        <small className="blog__countText">{`Znaleziono ${count} ${
          count >= 5 || count === 0 ? "postów" : "posty"
        }`}</small>
      )}
    </Form>
  );
};

export default Filter;

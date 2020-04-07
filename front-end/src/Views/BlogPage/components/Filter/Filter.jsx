import React, { useState, useEffect, useContext } from "react";
import { getFilters } from "Views/BlogPage/functions/fetchData";
import { Form, Col, Button } from "react-bootstrap";
import { DEFAULT_INPUT } from "constants/other.js";
import FormGroup from "components/FormGroup";
import { UserContext } from "context";
import { IndexLinkContainer } from "react-router-bootstrap";

const Filter = ({ token, setFilter, count }) => {
  const [filters, setFilters] = useState({ categories: [], tags: [] });
  const [category, setCategory] = useState(DEFAULT_INPUT);
  const [tag, setTag] = useState(DEFAULT_INPUT);

  const user = useContext(UserContext);

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
    const categoryV = category !== DEFAULT_INPUT ? category : undefined;
    const tagV = tag !== DEFAULT_INPUT ? tag : undefined;
    setFilter({
      category: categoryV,
      tag: tagV
    });
  };

  const clearFilter = () => {
    setCategory(DEFAULT_INPUT);
    setTag(DEFAULT_INPUT);
    setFilter({
      category: undefined,
      tag: undefined
    });
  };
  return (
    <Form className="ml-3 mr-3 mb-3" onSubmit={filter}>
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
          id="category"
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
          id="tag"
        />
      </Form.Row>
      <div>
        <Button type="submit" className="mr-3" variant="primary">
          Filtruj posty
        </Button>
        <Button
          variant="outline-primary"
          className="mr-3"
          onClick={clearFilter}
        >
          Wyczyść filtry
        </Button>
        {count !== 0 && (
          <small className="blog__countText">{`Znaleziono ${count} ${
            count >= 5 || count === 0 ? "postów" : "posty"
          }`}</small>
        )}
      </div>
      {user.type === "Staff" ? (
        <IndexLinkContainer as={Button} to="/blog/newPost">
          <Button variant="success" className="mt-2">
            Stwórz nowy post
          </Button>
        </IndexLinkContainer>
      ) : null}
    </Form>
  );
};

export default Filter;

// /blog/Penostw;

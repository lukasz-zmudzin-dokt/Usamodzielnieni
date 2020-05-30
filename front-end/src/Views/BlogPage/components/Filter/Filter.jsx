import React, { useState, useEffect, useContext } from "react";
import { getFilters } from "Views/BlogPage/functions/fetchData";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { DEFAULT_INPUT } from "constants/other.js";
import FormGroup from "components/FormGroup";
import { UserContext } from "context";
import { IndexLinkContainer } from "react-router-bootstrap";
import { staffTypes } from "constants/staffTypes";
import { userTypes } from "constants/userTypes";
import NewVideoBlogModal from "components/NewVideoBlogModal/NewVideoBlogModal";
import { Redirect, useParams } from "react-router-dom";

const Filter = ({ setFilter, filtersBlog, count }) => {
  const [filters, setFilters] = useState({ categories: [], tags: [] });
  const [category, setCategory] = useState(DEFAULT_INPUT);
  const [tag, setTag] = useState(DEFAULT_INPUT);
  const [err, setErr] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [redirectF, setRedirectF] = useState(false);
  const [redirectC, setRedirectC] = useState(false);
  const user = useContext(UserContext);
  const { cat } = useParams();

  useEffect(() => {
    setRedirectF(false);
    setRedirectC(false);
    const loadOffers = async () => {
      let res;
      try {
        res = await getFilters();
        res = {
          ...res,
          categories: res.categories.map((item) => item.name || item),
        }; //temp fix
      } catch (e) {
        res = { categories: [], tags: [] };
        setErr(true);
      }
      setFilters(res);
    };
    loadOffers();
    if (cat) {
      setCategory(cat);
    }
  }, [cat]);

  const filter = (event) => {
    event.preventDefault();
    const categoryV = category !== DEFAULT_INPUT ? category : undefined;
    const tagV = tag !== DEFAULT_INPUT ? tag : undefined;
    setFilter({
      ...filtersBlog,
      category: categoryV,
      tag: tagV,
    });
    setRedirectF(true);
  };

  const clearFilter = () => {
    setCategory(DEFAULT_INPUT);
    setTag(DEFAULT_INPUT);
    setFilter({
      ...filtersBlog,
      category: undefined,
      tag: undefined,
    });
    setRedirectC(true);
  };

  const msg = err ? (
    <Alert variant="danger" className="mt-3">
      Wystąpił błąd podczas ładowania filtrów.
    </Alert>
  ) : null;

  return (
    <>
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
        </div>
        {msg}
        {user &&
        user.type === userTypes.STAFF &&
        user.data.group_type.includes(staffTypes.BLOG_CREATOR) ? (
          <>
            <IndexLinkContainer as={Button} to="/blog/newPost">
              <Button variant="success" className="mt-2">
                Stwórz nowy post
              </Button>
            </IndexLinkContainer>
            <Button
              variant="success"
              className="mt-2 mx-3"
              onClick={() => setShowModal(true)}
            >
              Stwórz nowy wideoblog
            </Button>
          </>
        ) : null}
        <div>
          {count !== 0 && (
            <small className="blog__countText">{`Ilość znalezionych postów: ${count}`}</small>
          )}
        </div>
      </Form>
      <NewVideoBlogModal show={showModal} setShow={setShowModal} user={user} />
      {redirectF && category !== DEFAULT_INPUT && <Redirect to={"/blog/" + category}/>}
      {redirectC && <Redirect to="/blog"/>}
    </>
  );
};

export default Filter;

// /blog/Penostw;

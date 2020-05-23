import React, { useContext, useEffect, useState } from "react";
import { Accordion, Alert, Card, Container } from "react-bootstrap";
import { UserContext } from "context/UserContext";
import { getMyOffers } from "./functions/apiCalls";
import MyOffer from "./components/MyOffer";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { Pagination } from "components";

const MyOffersPage = () => {
  const context = useContext(UserContext);
  const location = useLocation();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeOffer, setActiveOffer] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadOffers = async (token, setOffers) => {
      setLoading(true);
      try {
        let res = await getMyOffers(token, filters);
        setCount(res.count);
        if (res.count > 0) {
          setOffers(res.results);
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    loadOffers(context.token, setOffers);
  }, [context.token, filters]);

  const message = loading ? (
    <Alert variant="info" className="m-3">
      Ładuję...
    </Alert>
  ) : error ? (
    <Alert variant="danger" className="m-3">
      Nie udało się załadować ofert.
    </Alert>
  ) : offers.length === 0 ? (
    <Alert variant="info" className="m-3">
      Brak ofert
    </Alert>
  ) : null;

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  return (
    <Container>
      <Card>
        <Card.Header as={"h2"}>Moje Oferty</Card.Header>
        <Card.Body className="p-0">
          {message ? message : null}
          <Accordion>
            {offers.map((offer) => (
              <MyOffer
                offer={offer}
                key={offer.id}
                activeOffer={activeOffer}
                setActiveOffer={setActiveOffer}
              />
            ))}
          </Accordion>
        </Card.Body>
        <Card.Footer>
          <Pagination
            current={filters.page}
            max={Math.ceil(count / filters.pageSize)}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default MyOffersPage;

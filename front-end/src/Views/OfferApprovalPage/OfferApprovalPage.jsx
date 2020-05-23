import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context";
import { Alert, Card, Container } from "react-bootstrap";
import OfferList from "./components/OfferList";
import { getOffers } from "./apiCalls";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { Pagination } from "components";

const OfferApprovalPage = () => {
  const context = useContext(UserContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offers, setOffers] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const [count, setCount] = useState(0);
  useEffect(() => {
    const loadOffers = async (token) => {
      setLoading(true);
      try {
        let res = await getOffers(token, filters);
        setCount(res.count);
        setOffers(res.results);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    loadOffers(context.token);
  }, [context.token, filters]);

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  const message = loading ? (
    <Alert variant="info" className="m-3">
      Ładuję...
    </Alert>
  ) : error ? (
    <Alert variant="danger" className="m-3">
      Ups, wystąpił błąd.
    </Alert>
  ) : offers.length === 0 ? (
    <Alert variant="info" className="m-3">
      Brak ofert do zatwierdzenia
    </Alert>
  ) : null;

  return (
    <Container>
      <Card>
        <Card.Header as={"h2"}>Oferty pracy do zatwierdzenia</Card.Header>
        <Card.Body className="p-0">
          {message ? message : null}
          <OfferList offers={offers} />
        </Card.Body>
        <Card.Footer className="py-0">
          <Pagination
            current={filters.page}
            max={Math.ceil(count / filters.pageSize)}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default OfferApprovalPage;

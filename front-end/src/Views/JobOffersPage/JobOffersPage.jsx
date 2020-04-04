import React, { useState, useEffect, useContext } from "react";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Filter from "./_components/Filter";
import qs from "query-string";
import "./style.css";
import { UserContext } from "context";
import { JobOfferInfo, OffersPagination } from "./_components";

const getOffers = async (token, filters) => {
  const {
    page,
    pageSize,
    voivodeship,
    minExpirationDate,
    category,
    type
  } = filters;
  const voivodeshipQ = voivodeship ? `&voivodeship=${voivodeship}` : "";
  const categoryQ = category ? `&category=${category}` : "";
  const typeQ = type ? `&type=${type}` : "";

  const expirationDateQ = minExpirationDate
    ? `&min_expiration_date=${minExpirationDate}`
    : "";
  const query = `?page=${page}&page_size=${pageSize}${voivodeshipQ}${expirationDateQ}${categoryQ}${typeQ}`;

  const url = "https://usamo-back.herokuapp.com/job/job-offers/" + query;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });
  if (response.status === 200) {
    return response.json().then(res => mapGetOffersRes(res));
  } else {
    throw response.status;
  }
};

const mapGetOffersRes = res => ({
  offers: res.results.map(offer => ({
    id: offer.id,
    title: offer.offer_name,
    companyName: offer.company_name,
    companyAddress: offer.company_address,
    voivodeship: offer.voivodeship,
    expirationDate: offer.expiration_date,
    description: offer.description
  })),
  count: res.count
});

const JobOffersPage = props => {
  const [offers, setOffers] = useState([]);
  const [count, setCount] = useState(0);
  const [isOffersLoading, setIsOffersLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10
  });
  const [error, setError] = useState(false);
  const user = useContext(UserContext);

  const queryParams = qs.parse(props.location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  useEffect(() => {
    const loadOffers = async token => {
      setIsOffersLoading(true);
      let res;
      try {
        res = await getOffers(token, filters);
      } catch (e) {
        console.log(e);
        res = { offers: [], count: 0 };
        setError(true);
      }
      setOffers(res.offers);
      setCount(res.count);
      setIsOffersLoading(false);
    };
    loadOffers(user.token);
  }, [user.token, filters]);

  const msg = error ? (
    <Alert variant="danger">Wystąpił błąd podczas ładowania ofert.</Alert>
  ) : isOffersLoading ? (
    <Alert variant="info">Ładowanie ofert...</Alert>
  ) : (
    offers.length === 0 && (
      <Alert variant="info">Brak ofert spełniających podane wymagania.</Alert>
    )
  );

  return (
    <Container className="jobOffersPage">
      <Card>
        <Card.Header as="h2">Oferty pracy</Card.Header>
        <Filter setFilters={setFilters} count={count} />
        {msg ? (
          <Card.Body>{msg}</Card.Body>
        ) : (
          <>
            <ListGroup variant="flush">
              {offers.map(offer => (
                <ListGroup.Item key={offer.id}>
                  <JobOfferInfo offer={offer} />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body>
              <OffersPagination
                current={filters.page}
                max={Math.ceil(count / filters.pageSize)}
              />
            </Card.Body>
          </>
        )}
      </Card>
    </Container>
  );
};

export default withRouter(JobOffersPage);

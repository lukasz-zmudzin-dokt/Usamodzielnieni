import React, { useState, useEffect, useContext } from "react";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import qs from "query-string";
import { UserContext } from "context";
import { JobOfferInfo, Filter } from "./_components";
import proxy from "config/api";
import { Pagination } from "components";

const getOffers = async (filters, sort) => {
  const {
    page,
    pageSize,
    voivodeship,
    minExpirationDate,
    category,
    type,
  } = filters;
  const voivodeshipQ = voivodeship ? `&voivodeship=${voivodeship}` : "";
  const categoryQ = category ? `&categories=${category}` : "";
  const typeQ = type ? `&types=${type}` : "";

  const expirationDateQ = minExpirationDate
    ? `&min_expiration_date=${minExpirationDate}`
    : "";
  const pageQuery = `page=${page}&page_size=${pageSize}${voivodeshipQ}${expirationDateQ}${categoryQ}${typeQ}`;
  const query = sort ? `?ordering=${sort}&${pageQuery}` : `?${pageQuery}`;
  const url = proxy.job + "job-offers/" + query;
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });
  if (response.status === 200) {
    return response.json().then((res) => {
      return mapGetOffersRes(res);
    });
  } else {
    throw response.status;
  }
};

const mapGetOffersRes = (res) => ({
  offers: res.results.map((offer) => ({
    id: offer.id,
    title: offer.offer_name,
    companyName: offer.company_name,
    companyAddress: offer.company_address,
    voivodeship: offer.voivodeship,
    expirationDate: offer.expiration_date,
    description: offer.description,
    companyLogo: offer.company_logo,
    salaryMin: offer.salary_min,
    salaryMax: offer.salary_max,
  })),
  count: res.count,
});

const JobOffersPage = (props) => {
  const [offers, setOffers] = useState([]);
  const [count, setCount] = useState(0);
  const [isOffersLoading, setIsOffersLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const [sort, setSort] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState(false);
  const user = useContext(UserContext);

  const queryParams = qs.parse(props.location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }

  useEffect(() => {
    setDisabled(true);
    const loadOffers = async () => {
      setIsOffersLoading(true);
      let res;
      try {
        res = await getOffers(filters, sort);
      } catch (e) {
        console.log(e);
        res = { offers: [], count: 0 };
        setErr(true);
      }
      setOffers(res.offers);
      setCount(res.count);
      setIsOffersLoading(false);
      setDisabled(false);
    };
    loadOffers();
  }, [filters, sort]);

  const msg = isOffersLoading ? (
    <Alert variant="info">Ładowanie ofert...</Alert>
  ) : err ? (
    <Alert variant="danger">Wystąpił błąd podczas ładowania ofert.</Alert>
  ) : (
    offers.length === 0 && (
      <Alert variant="info">Brak ofert spełniających podane wymagania.</Alert>
    )
  );
  return (
    <Container>
      <Card>
        <Card.Header as="h2">Oferty pracy</Card.Header>
        <Filter
          setFilters={setFilters}
          setSortJob={setSort}
          count={count}
          disabled={disabled}
        />
        {msg ? (
          <Card.Body>{msg}</Card.Body>
        ) : (
          <>
            <ListGroup variant="flush">
              {offers.map((offer) => (
                <ListGroup.Item key={offer.id}>
                  <JobOfferInfo offer={offer} context={user} />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body>
              <Pagination
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

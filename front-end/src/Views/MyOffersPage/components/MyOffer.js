import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Accordion,
  Card,
  Alert,
  ListGroup,
  Row,
  Button,
} from "react-bootstrap";
import "Views/MyOffersPage/style.css";
import { UserContext, AlertContext } from "context";
import { getOfferPeople, getZipUrl } from "../functions/apiCalls";
import MyOfferPerson from "./MyOfferPerson";
import { Link, useLocation } from "react-router-dom";
import { Pagination } from "components";
import qs from "query-string";
import proxy from "config/api";

const MyOffer = ({ offer, activeOffer, setActiveOffer }) => {
  const context = useContext(UserContext);
  const location = useLocation();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const alertC = useRef(useContext(AlertContext));
  const [filters, setFilters] = useState({
    pageSize: 10,
    page: 1,
  });

  useEffect(() => {
    const loadOfferPeople = async (token, offerId) => {
      setLoading(true);
      try {
        let res = await getOfferPeople(token, offerId, filters);
        if (res.count > 0) {
          setPeople(res);
        }
      } catch (err) {
        alertC.current.showAlert(
          "Ups, wystąpił błąd. Nie udało się załadować aplikujących do oferty."
        );
      }
      setLoading(false);
    };
    if (offer.id === activeOffer) {
      loadOfferPeople(context.token, offer.id, activeOffer);
    }
  }, [context.token, activeOffer, offer.id, filters]);

  const downloadApplications = async () => {
    try {
      let res = await getZipUrl(context.token, offer.id);
      let url = proxy.plain + res.url;
      window.open(url, "_blank");
    } catch(e) {
      console.log(e);
    }
  }

  const message = loading ? (
    <Alert variant="info">Ładuję...</Alert>
  ) : people.length === 0 ? (
    <Alert className="mb-0" variant="info">
      Brak zgłoszeń.
    </Alert>
  ) : null;

  const queryParams = qs.parse(location.search, { parseNumbers: true });
  if (
    typeof queryParams.page === "number" &&
    queryParams.page !== filters.page
  ) {
    setFilters({ ...filters, page: queryParams.page });
  }
  console.log(people.length);
  return (
    <Card className="border-left-0 border-right-0 border-bottom-0">
      <Accordion.Toggle
        as={Card.Header}
        eventKey={offer.id}
        onClick={(e) => setActiveOffer(offer.id)}
      >
        {offer.offer_name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={offer.id}>
        <Card.Body className="p-0">
          <ListGroup>
            {message ? (
              message
            ) : (
              <>
                {people.results?.map((value) => (
                  <MyOfferPerson person={value} key={value.id} />
                ))}
                <Pagination
                  current={filters.page}
                  max={Math.ceil(people.count / filters.pageSize)}
                />
              </>
            )}
            <ListGroup.Item>
              <Row className="justify-content-center">
                <Link to={"/jobOffers/" + offer.id}>
                  <Button>Pokaż ofertę</Button>
                </Link>
                <Link to={"/offerForm/" + offer.id}>
                  <Button className="ml-3">Edytuj ofertę</Button>
                </Link>
                <Button className="ml-3" onClick={() => downloadApplications()}>Pobierz zgłoszenia</Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default MyOffer;

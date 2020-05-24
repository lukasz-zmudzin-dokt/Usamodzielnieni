import React, { useContext, useEffect, useState } from "react";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Accordion, Alert, Card, Container } from "react-bootstrap";
import { UserContext } from "context/UserContext";
import { getMyOffers } from "./functions/apiCalls";
import MyOffer from "./components/MyOffer";

const MyOffersPage = () => {
  const context = useContext(UserContext);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeOffer, setActiveOffer] = useState("");


  const addNewOffer = () =>
      <IndexLinkContainer to={"/offerForm"} className="mb-0 mouse-hand-pointer">
        <Alert variant="primary" className="text-center">
          <b>Dodaj ofertę pracy</b>
        </Alert>
      </IndexLinkContainer>
  ;

  useEffect(() => {
    const loadOffers = async (token, setOffers) => {
      setLoading(true);
      try {
        let res = await getMyOffers(token);
        if (res.count > 0) {
          setOffers(res.results);
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    loadOffers(context.token, setOffers);
  }, [context.token]);

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
          {addNewOffer()}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyOffersPage;

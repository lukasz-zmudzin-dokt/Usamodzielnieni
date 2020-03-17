import React, { useState, useEffect, useContext } from "react";
import { Container, Card } from "react-bootstrap";
import "./style.css";
import { UserContext } from "context";
import { JobOfferInfo } from "./_components";

const getOffers = async (token) => {
  let url = "https://usamo-back.herokuapp.com/job/job-offers/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then(offers => mapOffers(offers));
  } else {
    throw response.status;
  }
}

const mapOffers = (offers) => offers.results.map(offer => ({
  id: offer.id,
  title: offer.offer_name,
  companyName: offer.company_name,
  companyAddress: offer.company_address,
  voivodeship: offer.voivodeship,
  expirationDate: offer.expiration_date,
  description: offer.description
}))

const JobOffersPage = props => {
  const [offers, setOffers] = useState([]);
  const [isOffersLoading, setIsOffersLoading] = useState(false);
  const [error, setError] = useState(false);
  const user = useContext(UserContext);

  useEffect(
    () => { loadOffers(user.token) },
    [user.token]
  );

  const loadOffers = async (token) => {
    setIsOffersLoading(true);
    let loadedOffers;
    try {
      loadedOffers = await getOffers(token);
    } catch(e) {
      console.log(e)
      loadedOffers = [];
      setError(true);
    }
    setOffers(loadedOffers);
    setIsOffersLoading(false);
  }

  return (
    <Container>
      <Card>
        <Card.Header as="h2">Oferty pracy</Card.Header>
        <Card.Body>
        {isOffersLoading ? <div>Ładowanie...</div> :
          error ? <div>Wystąpił błąd podczas ładowania.</div> :
          offers.length > 0 ?
          offers.map((offer) => <JobOfferInfo offer={offer} />) :
          <div>Brak ofert spełniających podane wymagania.</div>
        }
        </Card.Body>
      </Card>
    </Container>
  );
}

export default JobOffersPage;

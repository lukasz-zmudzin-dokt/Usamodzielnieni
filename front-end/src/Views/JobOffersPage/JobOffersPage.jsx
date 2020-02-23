import React, { useState, useEffect, useContext } from "react";
import { Container, Card } from "react-bootstrap";
import "./style.css";
import { UserContext } from "context";
import { JobOfferInfo } from "./_components";

const getOffers = async (token) => {
  let url = "https://usamo-back.herokuapp.com/offers/.../";
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
  // TODO
}

const mapOffers = (offers) => offers.map(offer => ({
  id: offer.id,
  title: offer.title,
  description: offer.description
  // TODO
}))

const JobOffersPage = props => {
  const [offers, setOffers] = useState([]);
  const [isOffersLoading, setIsOffersLoading] = useState(false);
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
    } catch {
      loadedOffers = [
        {
          id: "1",
          title: "Stolarz poszukiwany!",
          description: "Do naszego zakładu potrzebujemy osoby, która ma chęć rąbać drewno! To możesz być ty!!!",
          companyName: "Rębacze z Cintry sp. z o.o.",
          firstName: "Jarosław",
          lastName: "Psikuta",
          email: "paniewidzisztamsnakońcu@gmail.com",
          phone: "133792137"
        },
        {
          id: "2",
          title: "Pszczelarz poszukiwany!",
          description: "Do naszego zakładu potrzebujemy osoby, która ma chęć wyciagac miody pszczolom! To możesz być ty!!!",
          companyName: "Miody sp. z o.o.",
          firstName: "Jarosław",
          lastName: "Psikuta",
          email: "paniewidzisztamsnakońcu@gmail.com",
          phone: "133792137"
        }
      ] // TODO: dodanie informacji o błędzie
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
          offers.map((offer) => <JobOfferInfo offer={offer} />)
        }
        </Card.Body>
      </Card>
    </Container>
  );
}

export default JobOffersPage;

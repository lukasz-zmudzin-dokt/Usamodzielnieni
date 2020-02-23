import React, { useState, useEffect, useContext } from 'react';
import { Container, Card } from "react-bootstrap";
import "./style.css";
import { UserContext } from "context";
import { AddCvForm } from "./_components";

const getOfferDetails = async (id, token) => {
  let url = "https://usamo-back.herokuapp.com/offers/.../";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then(offer => mapOffer(offer));
  } else {
    throw response.status;
  }
  // TODO
}

const mapOffer = (offer) => ({
  id: offer.id,
  title: offer.title,
  description: offer.description
  // TODO
})

const JobOfferDetails = props => {
  const [offer, setOffer] = useState({});
  const [isOfferLoading, setIsOfferLoading] = useState(false);
  const user = useContext(UserContext);

  useEffect(
    () => { loadOffer(props.match.params.id, user.token) },
    [props.match.params.id, user.token]
  );

  const loadOffer = async (id, token) => {
    setIsOfferLoading(true);
    let loadedOffer;
    try {
      loadedOffer = await getOfferDetails(id, token);
    } catch {
      loadedOffer = {
        id: "1",
        title: "Stolarz poszukiwany!",
        description: "Do naszego zakładu potrzebujemy osoby, która ma chęć rąbać drewno! To możesz być ty!!!",
        companyName: "Rębacze z Cintry sp. z o.o.",
        firstName: "Jarosław",
        lastName: "Psikuta",
        email: "paniewidzisztamsnakońcu@gmail.com",
        phone: "133792137"
      } // TODO: dodanie informacji o błędzie
    }
    console.log(loadedOffer);
    setOffer(loadedOffer);
    setIsOfferLoading(false);
  }

  return (
    <Container>
      <Card>
      <Card.Header as="h2">Szczegóły oferty pracy</Card.Header>
      <Card.Body>
        {isOfferLoading ? <div>Ładowanie...</div> : (
          <div>
            <h3>{offer.title}</h3>
            <div>{offer.description}</div>
          </div>
        )}
        <AddCvForm user={user}/>
      </Card.Body>
      </Card>
    </Container>
  )
}

export default JobOfferDetails;
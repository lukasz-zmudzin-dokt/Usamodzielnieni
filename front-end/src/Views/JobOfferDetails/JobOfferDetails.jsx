import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Alert, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./style.css";
import { UserContext } from "context";
import { DetailsItem } from 'components';
import { AddCvForm } from "./_components";

const getOfferDetails = async (id, token) => {
  let url = `https://usamo-back.herokuapp.com/job/job-offer/${id}`;
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
}

const mapOffer = (offer) => ({
  id: offer.id,
  title: offer.offer_name,
  companyName: offer.company_name,
  companyAddress: offer.company_address,
  voivodeship: offer.voivodeship,
  expirationDate: offer.expiration_date,
  description: offer.description
})

const JobOfferDetails = props => {
  const [offer, setOffer] = useState({});
  const [isOfferLoading, setIsOfferLoading] = useState(false);
  const [error, setError] = useState(false);
  const user = useContext(UserContext);

  useEffect(
    () => {
      const loadOffer = async (id, token) => {
        setIsOfferLoading(true);
        let loadedOffer;
        try {
          loadedOffer = await getOfferDetails(id, token);
        } catch (e) {
          console.log(e);
          loadedOffer = {};
          setError(true);
        }
        setOffer(loadedOffer);
        setIsOfferLoading(false);
      }
      loadOffer(props.match.params.id, user.token)
    },
    [props.match.params.id, user.token]
  );

  const msg = isOfferLoading ? <Alert variant="info">Ładowanie...</Alert> :
              error && <Alert variant="danger">Wystąpił błąd podczas ładowania.</Alert>

  return (
    <Container>
      <Card>
      <Card.Header as="h2">Szczegóły oferty pracy</Card.Header>
      <Card.Body>
        { msg || (
          <div>
            <h3>{offer.title}</h3>
            <Row>
              <DetailsItem md="4" xl="3" label="Nazwa firmy">{offer.companyName}</DetailsItem>
              <DetailsItem md="4" xl="3" label="Lokalizacja">{offer.voivodeship}</DetailsItem>
              <DetailsItem md="4" xl="3" label="Ważne do">{offer.expirationDate}</DetailsItem>
            </Row>
            <p>{offer.description}</p>
          </div>
        )}
        <AddCvForm id={props.match.params.id} user={user}/>
      </Card.Body>
      </Card>
    </Container>
  )
}

export default withRouter(JobOfferDetails);
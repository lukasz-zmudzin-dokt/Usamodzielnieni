import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Alert, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { UserContext } from "context";
import { DetailsItem } from 'components';
import { AddCvForm, RemoveOffer } from "./_components";
import { staffTypes } from "constants/staffTypes";
import proxy from "config/api";

const getOfferDetails = async (id, token) => {
  let url = `${proxy.job}job-offer/${id}`;
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
  category: offer.category,
  type: offer.type,
  companyName: offer.company_name,
  companyAddress: `ul. ${offer.company_address.street} ${offer.company_address.street_number}, ${offer.company_address.postal_code} ${offer.company_address.city}`,
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

  const msg = isOfferLoading ? <Alert variant="info">Ładowanie oferty...</Alert> :
              error && <Alert variant="danger">Wystąpił błąd podczas ładowania oferty.</Alert>
  console.log(offer);

  return (
    <Container className="jobOfferDetails">
      <Card>
      <Card.Header as="h2">Szczegóły oferty pracy</Card.Header>
      <Card.Body>
        { msg || (
          <div>
            <h3>{offer.title}</h3>
            <Row>
              <DetailsItem md="6" xl="4" label="Nazwa firmy">{offer.companyName}</DetailsItem>
              <DetailsItem md="6" xl="4" label="Adres firmy">{offer.companyAddress}</DetailsItem>
              <DetailsItem md="6" xl="4" label="Lokalizacja">{offer.voivodeship}</DetailsItem>
              <DetailsItem md="6" xl="4" label="Ważne do">{offer.expirationDate}</DetailsItem>
              <DetailsItem md="6" xl="4" label="Branża">{offer.category}</DetailsItem>
              <DetailsItem md="6" xl="4" label="Typ">{offer.type}</DetailsItem>
            </Row>
            <p>{offer.description}</p>
          </div>
        )}
        { user.type === 'Standard' && user.data?.status === 'Verified' && <AddCvForm id={props.match.params.id} user={user} /> }
        { user.type === 'Staff' && user.data?.group_type.includes(staffTypes.JOBS) && <RemoveOffer id={props.match.params.id} user={user} /> }
      </Card.Body>
      </Card>
    </Container>
  )
};

export default withRouter(JobOfferDetails);
import React, { useState, useEffect, useContext } from 'react';
import {Container, Card, Alert, Row, Button} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { UserContext } from "context";
import { DetailsItem } from 'components';
import { AddCvForm } from "./_components";
import { deleteOffer } from "./functions/deleteOffer";
import {staffTypes} from "constants/staffTypes";

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
  category: offer.category,
  type: offer.type,
  companyName: offer.company_name,
  companyAddress: offer.company_address,
  voivodeship: offer.voivodeship,
  expirationDate: offer.expiration_date,
  description: offer.description
})

const handleDeleteOffer = async (e, id, token, setDeleted, setDeletionError) => {
  e.preventDefault();
  try {
    await deleteOffer(id, token);
    setDeleted(true);
  } catch(err) {
    setDeleted(true);
    setDeletionError(true);
  }
};

const JobOfferDetails = props => {
  const [offer, setOffer] = useState({});
  const [isOfferLoading, setIsOfferLoading] = useState(false);
  const [error, setError] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deletionError, setDeletionError] = useState(false);
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
        { user.type === 'Standard' && <AddCvForm id={props.match.params.id} user={user}/> }
        { user.type === 'Staff' && user.data.group_type === staffTypes.JOBS && !confirmDeletion ?
            <Row className="d-flex justify-content-center">
              <Button variant="danger" onClick={e => setConfirmDeletion(true)}>Usuń ofertę</Button>
            </Row>
            : null
        }
        { confirmDeletion && !deleted ?
            <Alert variant="warning mt-3" className="d-flex justify-content-center align-items-center">
              Czy na pewno chcesz usunąć tę ofertę?
              <Button variant="warning" className="ml-3" onClick={e => handleDeleteOffer(e, offer.id, user.token, setDeleted, setDeletionError)}>
                Tak
              </Button>
            </Alert>
            : null
        }
        { deleted && !deletionError ?
          <Alert variant="info" className="d-flex justify-content-center">
            Ta oferta została usunięta.
          </Alert>
          : null
        }
        { deleted && deletionError ?
            <Alert variant="danger" className="d-flex justify-content-center">
              Wystąpił błąd przy usuwaniu oferty.
            </Alert>
            : null
        }
      </Card.Body>
      </Card>
    </Container>
  )
};

export default withRouter(JobOfferDetails);
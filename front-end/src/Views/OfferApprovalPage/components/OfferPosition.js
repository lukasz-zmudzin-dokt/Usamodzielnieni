import React, { useContext, useState } from "react";
import { UserContext } from "context";
import { Alert, Button, Card, ListGroup, Row } from "react-bootstrap";
import { DetailsItem } from "components";
import {
  setOfferApproved,
  setOfferRejected,
} from "Views/OfferApprovalPage/apiCalls";

const OfferPosition = ({ offer }) => {
  const context = useContext(UserContext);
  const [error, setError] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const approveOffer = async (e) => {
    e.preventDefault();
    try {
      let res = await setOfferApproved(context.token, offer.id);
      if (res.message === "Ustawiono potwierdzenie oferty pracy") {
        setApproved(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const rejectOffer = async (e) => {
    e.preventDefault();
    try {
      let res = await setOfferRejected(context.token, offer.id);
      if (res.message === "Offer removed successfully") {
        setRejected(true);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  };

  const message = error ? (
    <Alert className="mb-0" variant="danger">
      Ups, wystąpił błąd...
    </Alert>
  ) : approved ? (
    <Alert className="mb-0" variant="success">
      Oferta zatwierdzona pomyślnie.
    </Alert>
  ) : rejected ? (
    <Alert className="mb-0" variant="success">
      Oferta odrzucona pomyślnie.
    </Alert>
  ) : null;

  return message ? (
    message
  ) : (
    <Card.Body className="p-0">
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <DetailsItem md={4} xl={2} label="Województwo">
              {offer.voivodeship}
            </DetailsItem>
            <DetailsItem md={4} xl={2} label="typ">
              {offer.type}
            </DetailsItem>
            <DetailsItem md={4} xl={2} label="Firma">
              {offer.company_name}
            </DetailsItem>
            <DetailsItem md={4} xl={2} label="Adres">
              <p>
                {offer.company_address.street}{" "}
                {offer.company_address.street_number}
              </p>
              <p>
                {offer.company_address.postal_code} {offer.company_address.city}
              </p>
            </DetailsItem>
            <DetailsItem md={4} xl={2} label="kategoria">
              {offer.category}
            </DetailsItem>
            <DetailsItem md={4} xl={2} label="Data wygaśnięcia">
              {offer.expiration_date}
            </DetailsItem>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <DetailsItem label="Opis">{offer.description}</DetailsItem>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="justify-content-center">
            <Button onClick={(e) => approveOffer(e)} variant="primary">
              Akceptuj
            </Button>
            <Button
              onClick={(e) => rejectOffer(e)}
              variant="danger"
              className="ml-3"
            >
              Odrzuć
            </Button>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  );
};

export default OfferPosition;

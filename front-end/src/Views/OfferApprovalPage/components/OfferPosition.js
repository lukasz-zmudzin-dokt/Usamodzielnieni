import React, { useContext, useRef } from "react";
import { UserContext, AlertContext } from "context";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import { DetailsItem } from "components";
import {
  setOfferApproved,
  setOfferRejected,
} from "Views/OfferApprovalPage/apiCalls";

const OfferPosition = ({ offer }) => {
  const context = useContext(UserContext);
  const alertC = useRef(useContext(AlertContext));

  const approveOffer = async (e) => {
    e.preventDefault();
    try {
      let res = await setOfferApproved(context.token, offer.id);
      if (res.message === "Ustawiono potwierdzenie oferty pracy") {
        alertC.current.showAlert("Pomyślnie potwierdzono ofertę", "success");
      } else {
        alertC.current.showAlert("Nie udało się potwierdzić oferty.");
      }
    } catch (err) {
      alertC.current.showAlert("Nie udało się potwierdzić oferty.");
    }
  };

  const rejectOffer = async (e) => {
    e.preventDefault();
    try {
      let res = await setOfferRejected(context.token, offer.id);
      if (res.message === "Offer removed successfully") {
        alertC.current.showAlert("Pomyślnie odrzucono ofertę.", "success");
      } else {
        alertC.current.showAlert("Nie udało się odrzucić oferty.");
      }
    } catch (e) {
      alertC.current.showAlert("Nie udało się odrzucić oferty.");
    }
  };

  return (
    <Card.Body className="p-0">
      <ListGroup variant="flush">
        {console.log(offer)}
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
          <Row>
            <DetailsItem md={2} xl={3} label="Wynagrodzenie">
              {offer.salary_min} zł - {offer.salary_max} zł
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

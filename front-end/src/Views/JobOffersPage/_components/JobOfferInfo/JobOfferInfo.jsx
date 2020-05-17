import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { DetailsItem } from "components";

const JobOfferInfo = ({ context, offer, ...rest }) => {
  return (
    <Row {...rest}>
      <Col>
        <h5>{offer.title}</h5>
        <Row>
          <DetailsItem md="4" xl="3" label="Nazwa firmy">
            {offer.companyName}
          </DetailsItem>
          <DetailsItem md="4" xl="3" label="Lokalizacja">
            {offer.voivodeship}
          </DetailsItem>
          <DetailsItem md="4" xl="3" label="Ważne do">
            {offer.expirationDate}
          </DetailsItem>
        </Row>
        <IndexLinkContainer to={`/jobOffers/${offer.id}`}>
          <Button>Pokaż szczegóły</Button>
        </IndexLinkContainer>
      </Col>
    </Row>
  );
};

export default JobOfferInfo;

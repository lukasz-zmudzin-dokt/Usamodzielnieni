import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { DetailsItem } from "components";
import proxy from "config/api";

const JobOfferInfo = ({ context, offer, ...rest }) => {
  console.log(offer);
  return (
    <Row {...rest}>
      <Col>
        <h5>{offer.title}</h5>
        <Row>
          {offer.companyLogo ? (
            <DetailsItem md="3" xl="3" label="Logo firmy">
              <img
                className="JobOffer__logo"
                src={`${proxy.plain}${offer.companyLogo}`}
              />
            </DetailsItem>
          ) : null}
          <DetailsItem md="3" xl="3" label="Nazwa firmy">
            {offer.companyName}
          </DetailsItem>
          <DetailsItem md="3" xl="3" label="Lokalizacja">
            {offer.voivodeship}
          </DetailsItem>
          <DetailsItem md="3" xl="3" label="Ważne do">
            {new Date(offer.expirationDate).toLocaleDateString(undefined, {})}
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

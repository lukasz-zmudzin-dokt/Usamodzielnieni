import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { DetailsItem } from "components";
import proxy from "config/api";

const JobOfferInfo = ({ context, offer, ...rest }) => {
  return (
    <Row {...rest}>
      <Col>
        <Row className="align-items-center m-0 mb-2 flex-nowrap">
          {offer.companyLogo ? (
            <div className="JobOffer__logo mb-2 mb-sm-0">
              <img
                className="JobOffer__logo"
                src={`${proxy.plain}${offer.companyLogo}`}
                alt="Logo firmy"
              />
            </div>
          ) : null}
          <h5 className={offer.companyLogo ? "ml-2 ml-sm-3" : ""}>
            {offer.title}
          </h5>
        </Row>
        <Row>
          <DetailsItem md="4" xl="3" label="Nazwa firmy">
            {offer.companyName}
          </DetailsItem>
          <DetailsItem md="4" xl="3" label="Lokalizacja">
            {`${offer.voivodeship}, ${offer.companyAddress.city}`}
          </DetailsItem>
          <DetailsItem md="4" xl="3" label="Ważne do">
            {new Date(offer.expirationDate).toLocaleDateString(undefined, {})}
          </DetailsItem>
          <DetailsItem md="4" xl="3" label="Wynagrodzenie:">
            {`${offer.salaryMin} zł - ${offer.salaryMax} zł`}
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

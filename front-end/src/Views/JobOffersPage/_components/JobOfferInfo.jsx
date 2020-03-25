import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import DetailsItem from './DetailsItem';

const JobOfferInfo = ({ offer, ...rest }) => {
    return (
      <Row {...rest}>
        <Col>
          <h5>{offer.title}</h5>
          <Row className="mb-3">
            <DetailsItem label="Nazwa firmy" value={offer.companyName} />
            <DetailsItem label="Lokalizacja" value={offer.voivodeship} />
            <DetailsItem label="Ważne do" value={offer.expirationDate} />
          </Row>
          <IndexLinkContainer to={`/jobOffers/${offer.id}`}>
            <Button>Pokaż szczegóły</Button>
          </IndexLinkContainer>
        </Col>
      </Row>
    )
}

export default JobOfferInfo;
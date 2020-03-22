import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import DetailsItem from './DetailsItem';

const JobOfferInfo = ({ offer, ...rest }) => {
    const getAddressString = (offer) => "TODO";
  
    return (
      <Row {...rest}>
        <Col>
          <h5>{offer.title}</h5>
          <Row as="p">
            <DetailsItem label="Nazwa firmy" value={offer.companyName} />
            <DetailsItem label="Lokalizacja" value={getAddressString(offer)} />
          </Row>
          <IndexLinkContainer to={`/jobOffers/${offer.id}`}>
            <Button>Pokaż szczegóły</Button>
          </IndexLinkContainer>
        </Col>
      </Row>
    )
}

export default JobOfferInfo;
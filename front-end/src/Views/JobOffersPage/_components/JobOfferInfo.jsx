import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

const JobOfferInfo = ({ offer, ...rest }) => {
    const getAddressString = (offer) => "TODO";
  
    return (
      <Row {...rest}>
        <Col>{offer.title}</Col>
        <Col>{offer.companyName}</Col>
        <Col>{getAddressString(offer)}</Col>
        <Col>
          <IndexLinkContainer to={`/jobOffers/${offer.id}`}>
            <Button>Pokaż szczegóły</Button>
          </IndexLinkContainer>
        </Col>
      </Row>
    )
}

export default JobOfferInfo;
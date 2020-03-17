import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

const JobOfferInfo = ({ offer, ...rest }) => {
    const getAddressString = (offer) => "TODO";
  
    return (
      <Row {...rest}>
        <Col>
          <Row>
            <Col><h3>{offer.title}</h3></Col>
          </Row>
          <Row>
            <Col>{offer.companyName}</Col>
            <Col>{getAddressString(offer)}</Col>
          </Row>
          <Row>
            <Col>
              <IndexLinkContainer to={`/jobOffers/${offer.id}`}>
                <Button>Pokaż szczegóły</Button>
              </IndexLinkContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    )
}

export default JobOfferInfo;
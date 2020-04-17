import React, {useState} from 'react';
import {Row, Col, Button, Alert} from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { DetailsItem } from 'components';
import { deleteOffer } from "Views/JobOffersPage/functions/deleteOffer";

const handleDeleteOffer = async (e, id, token, delError, setDelError, success, setSuccess ) => {
    e.preventDefault();
    try {
        await deleteOffer(id, token);
        setSuccess(true);
    } catch(err) {
        console.log(err);
        setDelError(true);
    }
};

const renderDelButton = (id, user, delError, setDelError, success, setSuccess) => {
    if(user.type === 'Staff') {
        return (
            <Button variant="danger" className="ml-3" onClick={e => handleDeleteOffer(e, id, user.token, delError, setDelError, success, setSuccess)}>Usuń ofertę</Button>
        )
    }
};

const JobOfferInfo = ({ context, offer, ...rest }) => {
    const [delError, setDelError] = useState(false);
    const [success, setSuccess] = useState(false);
    return (
      <Row {...rest}>
        <Col>
          <h5>{offer.title}</h5>
          <Row>
            <DetailsItem md="4" xl="3" label="Nazwa firmy">{offer.companyName}</DetailsItem>
            <DetailsItem md="4" xl="3" label="Lokalizacja">{offer.voivodeship}</DetailsItem>
            <DetailsItem md="4" xl="3" label="Ważne do">{offer.expirationDate}</DetailsItem>
          </Row>
          <IndexLinkContainer to={`/jobOffers/${offer.id}`}>
            <Button>Pokaż szczegóły</Button>
          </IndexLinkContainer>
            {renderDelButton(offer.id, context, delError, setDelError, success, setSuccess)}
            {
                delError ? <Alert variant="danger" className="mt-3">Wystąpił błąd podczas usuwania oferty.</Alert> :
                    success ? <Alert variant="info" className="mt-3">Ta oferta została usunięta.</Alert> : null
            }
        </Col>
      </Row>
    )
};

export default JobOfferInfo;

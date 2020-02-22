import React, { useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { IndexLinkContainer } from 'react-router-bootstrap';
import "./style.css";

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

const JobOffersPage = props => {
    const [offers, setOffers] = useState([
        {
            id: "1",
            title: "Stolarz poszukiwany!",
            description: "Do naszego zakładu potrzebujemy osoby, która ma chęć rąbać drewno! To możesz być ty!!!",
            companyName: "Rębacze z Cintry sp. z o.o.",
            firstName: "Jarosław",
            lastName: "Psikuta",
            email: "paniewidzisztamsnakońcu@gmail.com",
            phone: "133792137"
        },
        {
            id: "2",
            title: "Pszczelarz poszukiwany!",
            description: "Do naszego zakładu potrzebujemy osoby, która ma chęć wyciagac miody pszczolom! To możesz być ty!!!",
            companyName: "Miody sp. z o.o.",
            firstName: "Jarosław",
            lastName: "Psikuta",
            email: "paniewidzisztamsnakońcu@gmail.com",
            phone: "133792137"
        }
    ]);

    return (
        <Container>
            <Card>
                <Card.Header as="h2">Oferty pracy</Card.Header>
                <Card.Body>
                    {offers.map((offer) => <JobOfferInfo offer={offer} />)}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default JobOffersPage;

import React from "react";
import {Accordion, Card, Alert} from "react-bootstrap";
import InterestedPerson from "./InterestedPerson";
import MyOffersLegend from "./MyOffersLegend";
import { getInterestedPeople } from "Views/MyOffersPage/functions/getInterestedPeople";
import "Views/MyOffersPage/style.css";
import {loadInterestedPeople} from "../functions/loadInterestedPeople";

const MyOffer = ({ offer, token, component})  => {
    return (
        <Card className="border">
            <Accordion.Toggle className="mouse-hand-pointer" as={Card.Header} eventKey={offer.id} onClick={e => loadInterestedPeople(token, offer.id, component)}>
                {offer.offer_name} -
                <Alert.Link href={"/jobOffers/" + offer.id}> strona oferty</Alert.Link>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={offer.id}>
                <Card.Body>
                    {component.state.loadingPeople === true ? (
                        <Alert variant="info" className="mb-0">Ładuję...</Alert>
                    ) : null}
                    {component.state.answers.length === 0 && component.state.loadingPeople === false ? (
                        <Alert variant="info" className="mb-0">Do tej oferty nie zgłosiła się jeszcze żadna osoba.</Alert>
                    ) : null}
                    <MyOffersLegend answers={component.state.answers} />
                    {component.state.answers.map((value) => {
                        return (
                            <InterestedPerson person={value} key={value.id}/>
                        )
                    })}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default MyOffer;
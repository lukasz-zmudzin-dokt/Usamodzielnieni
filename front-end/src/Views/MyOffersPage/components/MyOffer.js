import React from "react";
import {Accordion, Card, Alert} from "react-bootstrap";
import InterestedPerson from "./InterestedPerson";
import MyOffersLegend from "./MyOffersLegend";
import { getInterestedPeople } from "Views/MyOffersPage/functions/getInterestedPeople";
import "Views/MyOffersPage/style.css";

const MyOffer = ({ offer, token, component})  => {
    return (
        <Card className="border">
            <Accordion.Toggle className="mouse-hand-pointer" as={Card.Header} eventKey={offer.id} onClick={e => (getInterestedPeople(token, offer.id)).then(r => r !== undefined ? component.setState({answers: r}):component.setState({answers: []}))}>
                {offer.offer_name} -
                <Alert.Link href="/"> strona oferty</Alert.Link>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={offer.id}>
                <Card.Body>
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
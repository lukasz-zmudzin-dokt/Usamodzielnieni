import React from "react";
import {Accordion, Card} from "react-bootstrap";
import InterestedPerson from "./InterestedPerson";
import MyOffersLegend from "./MyOffersLegend";
import { getInterestedPeople } from "../functions/getInterestedPeople";
import "../style.css";

const MyOffer = ({ offer, token, component})  => {
    return (
        <Card className="border">
            <Accordion.Toggle as={Card.Header} eventKey={offer.id} onClick={e => (getInterestedPeople(token, offer.id)).then(r => component.setState({answers: r}))}>
                {offer.offer_name}
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
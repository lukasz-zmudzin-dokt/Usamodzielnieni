import React from "react";
import {Accordion, Card} from "react-bootstrap";
import InterestedPerson from "./InterestedPerson";
import NoInterest from "./NoInterest";
import MyOffersLegend from "./MyOffersLegend";

const MyOffer = ({ offer })  => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={offer.id}>
                {offer.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={offer.id}>
                <Card.Body>
                    <NoInterest answers={offer.answers} />
                    <MyOffersLegend answers={offer.answers} />
                    {offer.answers.map((value) => {
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
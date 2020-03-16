import React from "react";
import {Accordion, Card} from "react-bootstrap";
import InterestedPerson from "./InterestedPerson";
import NoInterest from "./NoInterest";
import MyOffersLegend from "./MyOffersLegend";
import { getInterestedPeople } from "../functions/getInterestedPeople";

const MyOffer = ({ offer })  => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={offer.id} onClick={e => (getInterestedPeople(e, offer.id))}>
                {offer.offer_name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={offer.id}>
                <Card.Body>
                    <NoInterest answers={[]} />     {/*will change with backend in the future*/}
                    <MyOffersLegend answers={[]} /> {/*will change with backend in the future*/}
                    {[].map((value) => {            {/*will change with backend in the future*/}
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
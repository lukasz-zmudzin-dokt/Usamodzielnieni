import React from "react";
import {Accordion} from "react-bootstrap";
import MyOffer from "./MyOffer";

const MyOffers = ({ offers = [] })  => {
    return (
        <Accordion defaultActiveKey="0">
            {offers.map((value) => {
                return (
                    <MyOffer offer={value} key={value.id}/>
                )
            })}
        </Accordion>
    );
};

export default MyOffers;
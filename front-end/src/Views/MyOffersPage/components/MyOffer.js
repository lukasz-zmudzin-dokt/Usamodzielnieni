import React from "react";
import {Accordion, Card, Alert} from "react-bootstrap";
import InterestedPerson from "./InterestedPerson";
import MyOffersLegend from "./MyOffersLegend";
import { getInterestedPeople } from "Views/MyOffersPage/functions/getInterestedPeople";
import "Views/MyOffersPage/style.css";
import { UserContext } from "context/UserContext";

class MyOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: {},
            answers: [],
            loading: true
        };
    }

    render() {
        const {
            offer
        } = this.props;
        const {
            answers,
            loading
        } = this.state;
        return (
            <Card className="no-lrborder">
                <Accordion.Toggle className="mouse-hand-pointer" as={Card.Header} eventKey={offer.id} onClick={e => getInterestedPeople(this.context.token, offer.id).then(resp => resp.status === "200:OK" ? this.setState({loading: false, answers: resp.result}) : this.setState({ loading: true }))}>
                    {offer.offer_name} -
                    <Alert.Link href={"/jobOffers/" + offer.id}> strona oferty</Alert.Link>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={offer.id}>
                    <Card.Body>
                        {loading === true ? (
                            <Alert variant="info" className="mb-0">Ładuję...</Alert>
                        ) : null}
                        {answers.length === 0 && loading === false ? (
                            <Alert variant="info" className="mb-0">Do tej oferty nie zgłosiła się jeszcze żadna osoba.</Alert>
                        ) : null}
                        <MyOffersLegend answers={answers} />
                        {answers.map((value) => {
                            return (
                                <InterestedPerson person={value} key={value.user_id}/>
                            )
                        })}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
}

MyOffer.contextType = UserContext;

export default MyOffer;
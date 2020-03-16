import React from "react";
import "./style.css";
import {Card, Container} from "react-bootstrap";
import MyOffers from "./components/MyOffers";
import { getOffers } from "./functions/getOffers";

class MyOffersPage extends React.Component {

    state = {
        offers: [],
    };

    componentDidMount() {
        getOffers().then(response => this.setState({ offers: response.results}));
    }

    render() {

        return(
            <Container>
                <div className="background">
                    <Card className="main-card no-border">
                        <Card.Header className="border"><h3>Moje oferty</h3><p className="pt-3">Kliknij zakładkę, by wyświetlić osoby zainteresowane daną ofertą.</p></Card.Header>
                        <Card.Body className="border">
                            <MyOffers offers={this.state.offers}/>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default MyOffersPage;
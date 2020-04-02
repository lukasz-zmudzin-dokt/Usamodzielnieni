import React from "react";
import "./style.css";
import {Card, Container} from "react-bootstrap";
import MyOffers from "./components/MyOffers";
import { getOffers } from "./functions/getOffers";
import { UserContext } from "context/UserContext";

class MyOffersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { offers: [], answers: [] };
    }

    static contextType = UserContext;

    componentDidMount() {
        getOffers(this.context.token).then(response => this.setState({ offers: response.results}));
    }

    render() {

        return(
            <Container>
                <div className="max-height">
                    <Card className="center">
                        <Card.Header><h3>Moje oferty</h3></Card.Header>
                        <Card.Body>
                            <MyOffers offers={this.state.offers} token={this.context.token} component={this}/>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default MyOffersPage;
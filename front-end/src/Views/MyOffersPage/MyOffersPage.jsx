import React from "react";
import "./style.css";
import {Alert, Card, Container} from "react-bootstrap";
import MyOffers from "./components/MyOffers";
import { getOffers } from "./functions/getOffers";
import { UserContext } from "context/UserContext";

class MyOffersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            answers: [],
            error: false,
            errorMessage: "",
            loading: true
        };
    }

    componentDidMount() {
        getOffers(this.context.token).then(response => console.log(response));
        getOffers(this.context.token).then(response => response.status === "200:OK" ? this.setState({ offers: response.result }) : this.setState({ error: true, errorMessage: response.status}));
    }

    render() {
        const {
            offers,
            answers,
            error,
            errorMessage
        } = this.state;
        return(
            <Container>
                <div className="max-height pt-4">
                    <Card>
                        <Card.Header><h3>Moje oferty</h3></Card.Header>
                        <Card.Body>
                            {error ? (
                                <Alert variant="danger">Ups, coś poszło nie tak. Kod błędu - {errorMessage}</Alert>
                            ) : (
                                <MyOffers offers={offers} token={this.context.token} component={this}/>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

MyOffersPage.contextType = UserContext;

export default MyOffersPage;
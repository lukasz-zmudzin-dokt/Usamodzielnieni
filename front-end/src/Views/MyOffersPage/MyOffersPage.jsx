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
            loadingOffers: true,
            loadingPeople: true
        };
    }

    componentDidMount() {
        getOffers(this.context.token).then(response => console.log(response));
        getOffers(this.context.token).then(response => response.status === "200:OK" ? this.setState({ offers: response.result, loadingOffers: false }) : this.setState({ error: true, errorMessage: response.status, loadingOffers: false}));
    }

    render() {
        const {
            offers,
            answers,
            error,
            errorMessage,
            loadingOffers
        } = this.state;
        return(
            <Container>
                <div className="max-height pt-4">
                    <Card>
                        <Card.Header><h3>Moje oferty</h3></Card.Header>
                        <Card.Body>
                            {loadingOffers === true ? (
                                <Alert variant="info" className="mb-0">Ładuję...</Alert>
                            ) : null}
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
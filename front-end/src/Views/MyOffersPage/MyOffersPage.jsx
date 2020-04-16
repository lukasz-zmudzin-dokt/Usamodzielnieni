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
            error: false,
            errorMessage: "",
            loading: true
        };
    }

    componentDidMount() {
        getOffers(this.context.token)
        .then(response => response.status === "200:OK" ?
            this.setState({ offers: response.result, loading: false }) :
            this.setState({ error: true, errorMessage: response.status, loading: false}));
    }

    render() {
        const {
            offers,
            error,
            errorMessage,
            loading
        } = this.state;
        return (
            <Container className="pt-4">
                    <Card>
                        <Card.Header><h3>Moje oferty</h3></Card.Header>
                        <Card.Body className="p-0">
                            {loading === true ? (
                                <Alert variant="info" className="mb-0">Ładuję...</Alert>
                            ) : null}
                            {error ? (
                                <Alert variant="danger">Ups, coś poszło nie tak. Kod błędu - {errorMessage}</Alert>
                            ) : (
                                <MyOffers offers={offers}/>
                            )}
                        </Card.Body>
                    </Card>
            </Container>
        );
    }
}

MyOffersPage.contextType = UserContext;

export default MyOffersPage;
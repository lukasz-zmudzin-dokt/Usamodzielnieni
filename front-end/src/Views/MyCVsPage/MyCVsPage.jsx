import React from "react";
import {Container, Card, Row, Col, ListGroup, Alert} from "react-bootstrap";
import { UserContext } from "context/UserContext";

import { getUserCVs } from "./functions/getUserCVs";
import {getCVUrl} from "./functions/getCVUrl";
import CVSection from "./components/cvSection";

class MyCVsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvs: [],
            errors: {
                big: false,
                small: false
            },
            errorMessages: {
                big: "",
                small: ""
            },
            loading: true
        };
    }

    componentDidMount() {
        getUserCVs(this.context.token).then(response =>
            response.status === "200:OK" ? this.setState({
                    cvs: response.result,
                    loading: false
            }) :
                this.setState({
                    showModal: false,
                    errors: { big: true },
                    errorMessages: { big: response.status },
                    loading: false
                }));
    };

    showCV = async (cvId) => {
        let r;
        try {
            r = await getCVUrl(this.context.token, cvId);
            this.setState({errors: {small: false}});
            let url = "https://usamo-back.herokuapp.com" + r;
            window.open(url, '_blank');
        } catch(r) {
            this.setState({errors: {small: true}, errorMessages: {small: r}});
        }
    };

    render() {
        const {
            errors,
            errorMessages,
            cvs,
            loading
        } = this.state;
        return (
            <Container className="mt-4">
                    <Card>
                        <Card.Header as="h2">
                            Moje CV
                        </Card.Header>
                        {loading ? (
                            <Alert variant="primary" className="m-3">
                                Ładuję...
                            </Alert>
                        ) : null}
                        {errors.big ? (
                            <Alert variant="danger" className="m-3">
                                Ups, coś poszło nie tak. Kod błędu - {errorMessages.big.status}
                            </Alert>
                        ) :
                            <ListGroup variant="flush">
                                {!loading ? (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={12} md={5}><h6>Identyfikator CV</h6></Col>
                                            <Col xs={4} md={3}><h6>Status</h6></Col>
                                            <Col xs={8} md={4} className="text-right"><h6>Akcje</h6></Col>
                                        </Row>
                                    </ListGroup.Item>
                                ) : null}
                                {errors.small ? (
                                    <Alert variant="danger" className="m-3">
                                        Ups, coś poszło nie tak. Kod błędu - {errorMessages.small.status}
                                    </Alert>
                                ) : null
                                }
                                {cvs.length > 0 ? cvs.map((cv) =>
                                    <CVSection cv={cv} showCV={this.showCV}/>
                                ) : <Alert variant="info">Nie masz jeszcze żadnych CV. Utwórz nowe w zakładce "Kreator CV"!</Alert> }
                            </ListGroup>
                        }
                    </Card>
            </Container>
        )
    }
}

MyCVsPage.contextType = UserContext;

export default MyCVsPage;
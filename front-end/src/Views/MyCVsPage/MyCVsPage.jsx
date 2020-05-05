import React from "react";
import {Container, Card, Row, Col, ListGroup, Alert} from "react-bootstrap";
import { UserContext } from "context/UserContext";

import { getUserCVs } from "./functions/getUserCVs";
import CVSection from "./components/cvSection";
import {deleteCV} from "./functions/deleteCV";
import {IndexLinkContainer} from "react-router-bootstrap";

class MyCVsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvs: [],
            errors: false,
            loading: true,
            delError: false
        };
    }

    componentDidMount() {
        getUserCVs(this.context.token).then(response =>
            response.status === "200:OK" ? this.setState({
                    cvs: response.result,
                    loading: false
            }) :
                this.setState({
                    errors: true,
                    loading: false
                }));
    };

    cutItem = async (cvId) => {
        let deleted;
        try {
            deleted = await deleteCV(this.context.token, cvId);
        } catch(e) {
            console.log(e);
            this.setState({
                delError: true
            });
            return false;
        }
        if (deleted) {
            this.setState({
                cvs: this.state.cvs.filter(cv => cv.cv_id !== cvId)
            });
        }
    };

    render() {
        const {
            errors,
            cvs,
            loading,
            delError
        } = this.state;
        return (
            <Container className="mt-4">
                    <Card>
                        <Card.Header as="h2">
                            Moje CV ({cvs.length} / 5)
                        </Card.Header>
                        {loading ? (
                            <Alert variant="primary" className="m-3">
                                Ładuję...
                            </Alert>
                        ) : null}
                        <ListGroup variant="flush">
                            {!loading && cvs.length > 0 ? (
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={12} md={5}><h6>Nazwa pliku</h6></Col>
                                        <Col xs={4} md={3}><h6>Status</h6></Col>
                                        <Col xs={8} md={4} className="text-right"><h6>Akcje</h6></Col>
                                    </Row>
                                </ListGroup.Item>
                            ) : null}
                            {errors ? (
                                <Alert variant="danger" className="m-3">
                                    Ups, coś poszło nie tak. Nie można pobrać listy CV.
                                </Alert>
                            ) : cvs.length > 0 ? cvs.map((cv) =>
                                    <CVSection key={cv.cv_id} cv={cv} token={this.context.token} cutCV={this.cutItem}/>
                            ) : null }
                        </ListGroup>
                        {delError ? <Alert variant="danger">Wystąpił błąd podczas usuwania cv.</Alert> : null}
                        <Card.Body>
                            {
                                cvs.length === 5 ? <Alert variant="info" className="mb-0">Osiągnięto maksymalną liczbę CV. Jeżeli chcesz dodać nowe, usuń CV z listy powyżej.</Alert> :
                                    cvs.length === 0 ? <Alert variant="info" className="mb-0">Nie masz jeszcze żadnych CV. Utwórz nowe w zakładce "
                                            <IndexLinkContainer to="/cvEditor"><Alert.Link>Kreator CV</Alert.Link></IndexLinkContainer>"!</Alert> :
                                        null
                            }
                        </Card.Body>
                    </Card>
            </Container>
        )
    }
}

MyCVsPage.contextType = UserContext;

export default MyCVsPage;
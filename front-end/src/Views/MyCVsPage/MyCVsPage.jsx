import React from "react";
import {Container, Card, Row, Col, Button, ListGroup, Alert} from "react-bootstrap";
import { UserContext } from "context/UserContext";
import { IndexLinkContainer } from "react-router-bootstrap";

import CVStatus from "./components/CVStatus";
import { getUserCVs } from "./functions/getUserCVs";
import { showCV } from "./functions/showCV";

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
        getUserCVs(this.context.token).then(response => response.status === "200:OK" ? this.setState({cvs: response.result, loading: false}) : this.setState({showModal: false, errors: {big: true}, errorMessages: {big: response.status}, loading: false}));
    }

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
                                {cvs.map((cv) =>
                                    <ListGroup.Item key={cv.cv_id}>
                                        <Row className="d-flex align-items-center">
                                            <Col xs={12} md={5}>{cv.cv_id}</Col>
                                            <Col xs={4} md={3}><CVStatus wants_verification={cv.wants_verification} is_verified={cv.is_verified} /></Col>
                                            <Col xs={8} md={4} className="text-right">
                                                <IndexLinkContainer to={"/cvEditor/" + cv.cv_id}>
                                                    <Button variant="info">Edytuj</Button>
                                                </IndexLinkContainer>
                                                <Button className="ml-2" variant="primary" onClick={e => showCV(this.context.token, cv.cv_id, this)}>Zobacz CV</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        }
                    </Card>
            </Container>
        )
    }
}

MyCVsPage.contextType = UserContext;

export default MyCVsPage;
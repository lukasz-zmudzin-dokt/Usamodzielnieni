import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Container, Card, Row, Col, Button, ListGroup, Modal} from "react-bootstrap";
import { UserContext } from "context/UserContext";
import { IndexLinkContainer } from "react-router-bootstrap";

import './style.css';
import CVStatus from "./components/CVStatus";
import { getUserCVs } from "./functions/getUserCVs";
import { showCV } from "./functions/showCV";

class MyCVsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cvs: [], showModal: false, errorMessage: "" };
        this.closeModal = this.closeModal.bind(this);
        this.error = this.error.bind(this);
    }

    componentDidMount() {
        getUserCVs(this.context.token).then(response => response.status === "200:OK" ? this.setState({cvs: response.result}) : this.setState({showModal: true, errorMessage: response.status}));
    }

    error() {
        return this.state.errorMessage.status;
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <Container className="mt-4">
                <div className="center width-100">
                    <Card>
                        <Card.Header><h4>Moje CV</h4></Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={12} md={5} l={6}><h6>Identyfikator CV</h6></Col>
                                        <Col xs={4} md={3} l={2}><h6>Status</h6></Col>
                                        <Col xs={8} md={4} l={4} className="text-right"><h6>Akcje</h6></Col>
                                    </Row>
                                </ListGroup.Item>
                                {this.state.cvs.map((cv) =>
                                    <ListGroup.Item key={cv.cv_id}>
                                    <Row>
                                        <Col xs={12} md={5} l={6}>{cv.cv_id}</Col>
                                        <Col xs={4} md={3} l={2}><CVStatus wants_verification={cv.wants_verification} is_verified={cv.is_verified} /></Col>
                                        <Col xs={8} md={4} l={4} className="text-right">
                                            <IndexLinkContainer to={"/cvEditor" + cv.cv_id}>
                                                <Button variant="info">Edytuj</Button>
                                            </IndexLinkContainer>
                                            <Button className="align-self-end ml-2" variant="primary" onClick={e => showCV(this.context.token, cv.cv_id)}>Pobierz</Button>
                                        </Col>
                                    </Row>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                    </Card>
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Wystąpił błąd
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.error()}
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

MyCVsPage.contextType = UserContext;

export default MyCVsPage;
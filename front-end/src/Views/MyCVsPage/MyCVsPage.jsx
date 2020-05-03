import React from "react";
import {Container, Card, Row, Col, ListGroup, Alert} from "react-bootstrap";
import { UserContext } from "context/UserContext";

import { getUserCVs } from "./functions/getUserCVs";
import CVSection from "./components/cvSection";
import {deleteCV} from "./functions/deleteCV";

class MyCVsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvs: [],
            errors: false,
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
                    errors: "load",
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
                errors: "delete"
            });
        }
        if (deleted) {
            let cvList = this.state.cvs;
            const indexToCut = cvList.findIndex(cv => cv.cv_id = cvId);
            cvList.splice(indexToCut, 1);
            this.setState({
                cvs: cvList
            });
        } else {
            this.setState({
                errors: "not found"
            });
        }
    };

    render() {
        const {
            errors,
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
                        <ListGroup variant="flush">
                            {!loading ? (
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={12} md={5}><h6>Nazwa pliku</h6></Col>
                                        <Col xs={4} md={3}><h6>Status</h6></Col>
                                        <Col xs={8} md={4} className="text-right"><h6>Akcje</h6></Col>
                                    </Row>
                                </ListGroup.Item>
                            ) : null}
                            {errors !== false ? (
                                <Alert variant="danger" className="m-3">
                                    Ups, coś poszło nie tak. Nie można pobrać listy CV.
                                </Alert>
                            ) : cvs.length > 0 ? cvs.map((cv) =>
                                    <CVSection key={cv.cv_id} cv={cv} token={this.context.token} cutCV={this.cutItem}/>
                            ) : <Alert variant="info">Nie masz jeszcze żadnych CV. Utwórz nowe w zakładce "Kreator CV"!</Alert> }
                        </ListGroup>
                    </Card>
            </Container>
        )
    }
}

MyCVsPage.contextType = UserContext;

export default MyCVsPage;
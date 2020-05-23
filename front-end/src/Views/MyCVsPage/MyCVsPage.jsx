import React from "react";
import { Container, Card, Row, Col, ListGroup, Alert } from "react-bootstrap";
import { UserContext } from "context/UserContext";
import { getUserCVs } from "./functions/getUserCVs";
import CVSection from "./components/cvSection";
import { deleteCV } from "./functions/deleteCV";
import { IndexLinkContainer } from "react-router-bootstrap";
import { withAlertContext } from "components";

class MyCVsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvs: [],
      errors: false,
      loading: true,
    };
  }

  getCVs = async () => {
    try {
      const res = await getUserCVs(this.context.token);
      this.setState({ cvs: res });
    } catch (e) {
      console.log(e);
      this.setState({ errors: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.getCVs();
  }

  cutItem = async (cvId) => {
    let deleted;
    try {
      deleted = await deleteCV(this.context.token, cvId);
    } catch (e) {
      console.log(e);
      this.props.alertContext.showAlert("Wystąpił błąd podczas usuwania CV.");
      return false;
    }
    if (deleted) {
      this.props.alertContext.showAlert("Pomyślnie usunięto CV", "success");
      this.setState({
        cvs: this.state.cvs.filter((cv) => cv.cv_id !== cvId),
      });
    }
  };

  showAlert = () =>
      <Card.Body>
        {this.state.loading ? (
            <Alert variant="primary" className="mb-0">
              Ładuję...
            </Alert>
        ) : this.state.errors ? (
            <Alert variant="danger" className="mb-0">
              Ups, coś poszło nie tak. Nie można pobrać listy CV.
            </Alert>
        ) : this.state.cvs.length === 5 ? (
            <Alert variant="info" className="mb-0">
              Osiągnięto maksymalną liczbę CV. Jeżeli chcesz dodać nowe, usuń CV z
              listy powyżej.
            </Alert>
        ) : this.state.cvs.length === 0 ? (
            <Alert variant="info" className="mb-0">
              Nie masz jeszcze żadnych CV. Utwórz nowe w zakładce "
              <IndexLinkContainer to="/cvEditor">
                <Alert.Link>Kreator CV</Alert.Link>
              </IndexLinkContainer>
              "!
            </Alert>
        ) : <Alert variant="primary" className="mb-0">
          <IndexLinkContainer to="/cvEditor" className="d-flex justify-content-center">
            <Alert.Link>Stwórz kolejne CV</Alert.Link>
          </IndexLinkContainer>
        </Alert>}
      </Card.Body>;

  render() {
    const { cvs, loading, errors } = this.state;
    return (
      <Container className="mt-4">
        <Card>
          <Card.Header as="h2">Moje CV ({cvs.length} / 5)</Card.Header>
          <ListGroup variant="flush">
            {!loading && cvs.length > 0 ? (
              <ListGroup.Item>
                <Row>
                  <Col xs={12} md={4}>
                    <h6>Nazwa CV</h6>
                  </Col>
                  <Col xs={4} md={2}>
                    <h6>Status</h6>
                  </Col>
                  <Col xs={8} md={6} className="text-right">
                    <h6>Akcje</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            ) : null}
            {cvs.length > 0
              ? cvs.map((cv) => (
                  <CVSection
                    key={cv.cv_id}
                    cv={cv}
                    token={this.context.token}
                    cutCV={this.cutItem}
                  />
                ))
              : null}
          </ListGroup>
          {this.showAlert()}
        </Card>
      </Container>
    );
  }
}

MyCVsPage.contextType = UserContext;

export default withAlertContext(MyCVsPage);

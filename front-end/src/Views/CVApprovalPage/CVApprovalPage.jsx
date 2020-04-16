import React from "react";
import {Alert, Card, Container} from "react-bootstrap";
import { getCVs } from "./functions/getCVs";
import {UserContext} from "context/UserContext";
import CVList from "./components/CVList";

class CVApprovalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvs: [],
            error: false,
            errorMsg: "",
            loading: true
        };
    }

    componentDidMount() {
        getCVs(this.context.token)
        .then(response => response.status === "200:OK" ?
            this.setState({ loading: false, cvs: response.result}) :
            this.setState({loading: false, error: true, errorMsg: response.status}));
    }

    render() {
        const {
            cvs,
            error,
            errorMsg,
            loading
        } = this.state;
        return (
            <Container className="pt-4">
                    <Card>
                        <Card.Header as="h2">CV do akceptacji</Card.Header>
                        {loading ? (
                            <Alert variant="info" className="m-3">Ładuję...</Alert>
                        ): (
                            <Card.Body className="p-0">
                                {error ? (
                                    <Alert variant="danger">
                                        Ups, coś poszło nie tak. Kod błędu - {errorMsg}
                                    </Alert>
                                ) : (
                                    <CVList cvs={cvs} />
                                )}
                            </Card.Body>
                        )}
                    </Card>
            </Container>
        )
    };
}

CVApprovalPage.contextType = UserContext;

export default CVApprovalPage;
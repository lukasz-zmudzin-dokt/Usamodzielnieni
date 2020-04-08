import React from "react";
import {Alert, Card, Container} from "react-bootstrap";
import { getCVs } from "./functions/getCVs";
import {UserContext} from "context/UserContext";
import CVApprovalBody from "./components/CVApprovalBody";

class CVApprovalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvs: [],
            errors: {
                big: false,
                small: false,
                smaller: false
            },
            errorMessages: {
                big: "",
                small: "",
                smaller: ""
            },
            loading: true
        };
    }

    componentDidMount() {
        getCVs(this.context.token).then(response => response.status === "200:OK" ? this.setState({ loading: false, cvs: response.result}) : this.setState({loading: false, errors: {big: true}, errorMessages: {big : response.status}}));
        //getCVs(this.context.token).then(response => console.log(response));
    }

    render() {
        const {
            cvs,
            errors,
            errorMessages,
            loading
        } = this.state;
        return (
            <Container className="mt-4">
                    <Card>
                        <Card.Header className="border pb-4"><h2>CV do przejrzenia</h2></Card.Header>
                        {loading ? (
                            <Alert variant="info" className="m-3">Ładuję...</Alert>
                        ): (
                            <Card.Body className="border p-0 pt-3">
                                {errors.big ? (
                                    <Alert variant="danger">
                                        Ups, coś poszło nie tak. Kod błędu - {errorMessages.big.status}
                                    </Alert>
                                ) : (
                                    <CVApprovalBody cvs={cvs} token={this.context.token} component={this}/>
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
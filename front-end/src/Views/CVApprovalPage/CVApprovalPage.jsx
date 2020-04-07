import React from "react";
import {Alert, Card, Container} from "react-bootstrap";
import "./style.css";
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
            }
        };
    }

    componentDidMount() {
        getCVs(this.context.token).then(response => response.status === "200:OK" ? this.setState({ cvs: response.result}) : this.setState({errors: {big: true}, errorMessages: {big : response.status}}));
        //getCVs(this.context.token).then(response => console.log(response));
    }

    render() {
        const {
            cvs,
            errors,
            errorMessages
        } = this.state;
        return (
            <Container className="mt-4">
                <div className="width-100">
                    <Card>
                        <Card.Header className="border pb-4"><h3>CV do przejrzenia</h3></Card.Header>
                        <Card.Body className="border p-0 pt-3">
                            {errors.big ? (
                                <Alert variant="danger">
                                    Ups, coś poszło nie tak. Kod błędu - {errorMessages.big.status}
                                </Alert>
                            ) : (
                                <CVApprovalBody cvs={cvs} token={this.context.token} component={this}/>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        )
    };
}

CVApprovalPage.contextType = UserContext;

export default CVApprovalPage;
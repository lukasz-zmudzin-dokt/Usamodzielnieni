import React from "react";
import bgImage from "assets/fot..png";
import {Button, Card, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {renderMessage, handleSubmit} from "../functions/submitActions";
import "../style.css"
import {Redirect} from "react-router-dom";

class PasswordResetPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            correct: false,
            redirect: false
        }
        this.setCorrect.bind(this);
        this.setRedirect.bind(this);
    };

    setCorrect = () => {
        this.setState({
            correct: true
        })
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = (redirect) => {
        if (redirect)
            return <Redirect to="/newPassword"/>
    };

    render() {
        let {email, correct, redirect} = this.state;
        let {renderRedirect, setRedirect} = this;
        return(
            <Container className="loginPage">
                {window.innerWidth >= 768 ? (
                    <img className="loginPage__bgImage" src={bgImage} alt="tło" />
                ) : null}
                <Card className="loginPage__card loginPage__card--login">
                    <Card.Header as="h2" className="loginPage__header">
                        Zmiana hasła
                    </Card.Header>
                    <Card.Body className="loginPage__body">
                        <Form
                            noValidate
                            onSubmit={e => handleSubmit({email}, this.setCorrect, e)}
                            className="primary"
                        >
                            <Form.Group controlId="formGroupUsername">
                                <Form.Control
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    required
                                    defaultValue={email}
                                    onBlur={e => this.setState({email: e.target.value})}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj email
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="secondary" className="passwordR_submit_email" type="submit" data-testid="sendMailBtn">Wyślij</Button>
                            {renderMessage(correct, setRedirect)}
                            {renderRedirect(redirect)}
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default PasswordResetPrompt;
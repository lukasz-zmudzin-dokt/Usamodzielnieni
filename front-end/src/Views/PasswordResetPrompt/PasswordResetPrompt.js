import React from "react";
import bgImage from "assets/fot..png";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {handleConnection} from "./functions/submitActions";
import "./style.css"
import {Redirect} from "react-router-dom";

class PasswordResetPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            correct: undefined,
            redirect: false
        };
    };

    setCorrect = (bool) => {
        this.setState({
            correct: bool
        })
    };

    setRedirect = () => {
        setTimeout( () => {
            this.setState({
                redirect: true
            });
        }, 3000);
    };

    renderRedirect = (redirect) => {
        if (redirect)
            return <Redirect to="/newPassword" />
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.email === "")
            e.stopPropagation();
        handleConnection(this.state.email, e).then( res => {
            this.setCorrect(res);
        });
    };

    renderMessage = (correct, setRedirect) => {
        if (correct !== undefined) {
            if (correct) {
                return (
                    <div className="submit_message" data-testid="submit_message">
                        <Alert variant="success" className="msg_text">Jeżeli Twoje konto istnieje, to właśnie otrzymałeś maila. Sprawdź skrzynkę i przejdź dalej!</Alert>
                        {setRedirect()}
                    </div>
                );
            }
            return (
                <div className="submit_message" data-testid="submit_message">
                    <Alert variant="danger" className="msg_text">Coś poszło nie tak.</Alert>
                </div>
            );
        }
    };

    render() {
        let {email, correct, redirect} = this.state;
        let {renderRedirect, setRedirect, renderMessage, handleSubmit} = this;
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
                            onSubmit={e => handleSubmit(e)}
                            className="primary"
                        >
                            <Form.Group controlId="formGroupUsername">
                                <Form.Control
                                    type="email"
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
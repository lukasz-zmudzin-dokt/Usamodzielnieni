import React from "react";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {handleConnection} from "./functions/submitActions";
import "./style.css"

class PasswordResetPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            correct: undefined
        };
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
           try {
               await handleConnection(this.state.email);
               this.setState({
                   correct: true
               });
           } catch(e) {
               console.log(e);
               this.state({
                   correct: false
               })
           }
        }

    };

    render() {
        let {email, correct} = this.state;
        let {handleSubmit} = this;
        return(
            <Container className="loginPage">
                <Card className="loginPage__card loginPage__card--login">
                    <Card.Header as="h2" className="loginPage__header">
                        Zmiana hasła
                    </Card.Header>
                    <Card.Body className="loginPage__body">
                        <Form
                            onSubmit={handleSubmit}
                            className="primary"
                        >
                            <Form.Group controlId="formGroupEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    required
                                    defaultValue={email}
                                    onChange={e => this.setState({email: e.target.value})}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj email we właściwym formacie
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" className="passwordR_submit_email" type="submit" data-testid="sendMailBtn">Wyślij</Button>
                        </Form>
                        <div className="submit_message" data-testid="submit_message">
                            {
                                correct ? (correct === true ?
                                    <Alert variant="success" className="msg_text">Jeżeli Twoje konto istnieje, to właśnie otrzymałeś maila. Sprawdź skrzynkę i przejdź dalej!</Alert> :
                                    <Alert variant="danger" className="msg_text">Coś poszło nie tak.</Alert>) :
                                    null
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default PasswordResetPrompt;
import React from "react";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {handleConnection} from "./functions/submitActions";
import "./style.css"

class PasswordResetPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            correct: false,
            disabled: false,
            validated: false
        };
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            disabled: true
        });
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            this.setState({
                disabled: false
            })
        } else {
           try {
               await handleConnection(this.state.email);
               this.setState({
                   correct: true
               });
           } catch(e) {
               console.log(e);
               this.setState({
                   correct: false
               })
           } finally {
               this.setState({
                   validated: true,
                   disabled: false
               })
           }
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let {email, correct, disabled, validated} = this.state;
        let {handleSubmit, onChange} = this;
        return(
            <Container className="loginPage">
                <Card className="loginPage__card loginPage__card--login">
                    <Card.Header as="h2" className="loginPage__header">
                        Zmiana hasła
                    </Card.Header>
                    <Card.Body className="loginPage__body">
                        <Form
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Form.Group controlId="formGroupEmail">
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Podaj swój email"
                                    value={email}
                                    required
                                    onChange={onChange}
                                    minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj email we właściwym formacie
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                variant="primary"
                                disabled={disabled}
                                type="submit"
                            >
                                {disabled ? "Ładowanie..." : "Wyślij"}
                            </Button>
                        </Form>
                        <div className="submit_message">
                            {
                                validated  ? (correct ?
                                    <Alert variant="success" className="mt-2 msg_text">Jeżeli Twoje konto istnieje, to właśnie otrzymałeś maila. Sprawdź skrzynkę i przejdź dalej!</Alert> :
                                    <Alert variant="danger" className="mt-2 msg_text">Coś poszło nie tak.</Alert>) :
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
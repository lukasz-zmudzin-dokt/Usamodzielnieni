import React from "react";
import bgImage from "../../assets/fot..png";
import {Button, Card, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {handleBlur} from "./functions/handlers";
import {renderMessage, handleSubmit} from "./functions/submitActions";

class PasswordResetPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            correct: false
        }
    };

    setCorrect = () => {
        this.setState({
            correct: true
        })
    };

    render() {
        let {email, correct} = this.state;
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
                                    onBlur={e => handleBlur(this, e)}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj właściwy email
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="secondary" className="passwordR_submit_email" type="submit">Wyślij</Button>
                            {renderMessage(correct)}
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default PasswordResetPrompt;
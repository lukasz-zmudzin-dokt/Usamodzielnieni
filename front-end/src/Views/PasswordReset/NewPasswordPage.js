import React from "react";
import bgImage from "../../assets/fot..png";
import {Button, Card, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {handleBlur, validatePassword} from "./functions/handlers";
import {handlePasswordChange} from "./functions/submitActions";

class NewPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            new_password: "",
            new_passwordR: "",
            validated: false
        }
    }

    render() {
        const { token, new_password, new_passwordR, validated } = this.state;
        return (
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
                            validated={validated}
                            onSubmit={e => handlePasswordChange(this, e)}
                            className="primary"
                        >
                            <Form.Group controlId="formGroupUsername">
                                <Form.Control
                                    name="token"
                                    type="text"
                                    placeholder="Token"
                                    required
                                    defaultValue={token}
                                    onBlur={e => handleBlur(this, e)}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    name="new_password"
                                    type="password"
                                    placeholder="Nowe hasło"
                                    required
                                    defaultValue={new_password}
                                    onBlur={e => handleBlur(this, e)}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    name="new_passwordR"
                                    type="password"
                                    placeholder="Powtórz hasło"
                                    required
                                    defaultValue={new_passwordR}
                                    onBlur={e => handleBlur(this, e)}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validatePassword(this)}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="secondary" className="loginPage__button" type="submit">Wyślij</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default NewPasswordPage;
import React from "react";
import bgImage from "../../assets/fot..png";
import {Button, Card, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {handleBlur, renderPasswordMessage, validatePassword} from "./functions/handlers";
import {handlePasswordChange} from "./functions/submitActions";
import {Redirect} from "react-router-dom";
import "./style.css"

class NewPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            password: "",
            passwordR: "",
            validated: false,
            password_changed: false
        }
        this.setPasswordChanged.bind(this);
        this.setValidated.bind(this);
        this.redirectToLogin.bind(this);
    }

    setPasswordChanged = () => {
        this.setState({
            password_changed: true
        })
    };

    setValidated = () => {
        this.setState({
            validated: true
        })
    };

    redirectToLogin = () => {
        if (this.state.password_changed)
            setTimeout( function() {
                return (<Redirect to="/login"/>)
            }, 3000)
    };

    render() {
        const { token, password, passwordR, validated, password_changed } = this.state;
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
                            onSubmit={e => handlePasswordChange({password, token}, this.setPasswordChanged, e)}
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
                                    name="password"
                                    type="password"
                                    placeholder="Nowe hasło"
                                    required
                                    defaultValue={password}
                                    onBlur={e => handleBlur(this, e)}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    name="passwordR"
                                    type="password"
                                    placeholder="Powtórz hasło"
                                    required
                                    defaultValue={passwordR}
                                    onBlur={e => handleBlur(this, e)}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {e => validatePassword(password, passwordR, this.setValidated, e)}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="secondary" className="loginPage__button" data-testid="btn_change_pass" type="submit">Wyślij</Button>
                            {renderPasswordMessage(password_changed, e => this.redirectToLogin(e))}
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default NewPasswordPage;
import React from "react";
import bgImage from "../../assets/fot..png";
import {Alert, Button, Card, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
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
            password_changed: undefined
        };
    }

    setValidated = () => {
        this.setState({
            validated: true
        })
    };

    validatePassword = (new_password, new_passwordR, e) => {
        e.preventDefault();
        if (new_password !== new_passwordR)
            return "Hasła się nie zgadzają!";
        else if (new_password.length < 6)
            return "Hasło jest za krótkie!";
        else {
            this.setValidated();
            return null;
        }
    };

    setPasswordChanged = () => {
        this.setState({
            password_changed: true
        })
    };

    renderPasswordMessage = () => {
        if (this.state.password_changed !== undefined) {
            if (this.state.password_changed)
                return (
                    <div className="message_pass_changed" data-testid="passMsg">
                        <Alert variant="success" className="msgText_correct">Hasło zostało zmienione. Przekierowuję...</Alert>
                        {this.renderDelayedRedirect()}
                    </div>
                );
            else return (
                <div className="message_pass_changed" data-testid="passMsg">
                    <Alert variant="danger" className="msgText_fail">Coś poszło nie tak. Upewnij się, że Twój token nie wygasł.</Alert>
                </div>
            );
        }
    };

    renderDelayedRedirect = async () => {
        setTimeout( () => {
            return (<Redirect to="/login"/>)
        }, 3000);
    };

    handleBlur = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        const { token, password, passwordR, validated } = this.state;
        const {handleBlur} = this;
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
                            onSubmit={e => handlePasswordChange({password, token}, this.setPasswordChanged(), e)}
                            className="primary"
                        >
                            <Form.Group controlId="formGroupUsername">
                                <Form.Control
                                    name="token"
                                    type="text"
                                    placeholder="Token"
                                    required
                                    defaultValue={token}
                                    onBlur={e => handleBlur(e)}
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
                                    onBlur={e => handleBlur(e)}
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
                                    onBlur={e => handleBlur(e)}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {e => this.validatePassword(password, passwordR, e)}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="secondary" className="loginPage__button" data-testid="btn_change_pass" type="submit">Wyślij</Button>
                            {this.renderPasswordMessage()}
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default NewPasswordPage;
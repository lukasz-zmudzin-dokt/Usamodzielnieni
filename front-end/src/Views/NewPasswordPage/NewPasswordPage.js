import React from "react";
import bgImage from "../../assets/fot..png";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {handlePasswordChange} from "./functions/submitActions";
import {Redirect} from "react-router-dom";
import "../PasswordResetPrompt/style.css"

class NewPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            password: "",
            passwordR: "",
            validated: false,
            password_changed: undefined,
            message: "",
            redirect: false
        };
    }

    setValidated = () => {
        this.setState({
            validated: true
        })
    };

    validatePassword = (new_password, new_passwordR) => {
        if (new_password !== new_passwordR)
            return "Hasła się nie zgadzają!";
        else if (new_password.length < 8)
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
                        {this.setDelayedRedirect()}
                    </div>
                );
            else return (
                <div className="message_pass_changed" data-testid="passMsg">
                    <Alert variant="danger" className="msgText_fail">Coś poszło nie tak. Upewnij się, że Twój token nie wygasł.</Alert>
                </div>
            );
        }
    };

    setDelayedRedirect = () => {
        setTimeout( () => {
            this.setState({
                redirect: true
            })
        }, 3000);
    };

    handleBlur = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    renderRedirect = () => {
        if (this.state.redirect)
            return <Redirect to="/login" />
    };

    handleSubmit = (e) => {
        const {token, password, passwordR} = this.state;
        const password_msg = this.validatePassword(password, passwordR);
        this.setState({
            message: password_msg
        });
        e.preventDefault();
        const data = {
            token: token,
            password: password
        };
        handlePasswordChange(data, e).then( response => {
            console.log(response);
            const {status} = response;
            this.setState({
                password_changed: (status === 200)
            });
        })
    };

    render() {
        const { token, password, passwordR, validated, password_msg } = this.state;
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
                            onSubmit={e => this.handleSubmit(e)}
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
                                    minLength="8"
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
                                    minLength="8"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {password_msg}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="secondary" className="loginPage__button" data-testid="btn_change_pass" type="submit">Wyślij</Button>
                            {this.renderPasswordMessage()}
                            {this.renderRedirect()}
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default NewPasswordPage;
import React from "react";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {handlePasswordChange} from "./functions/submitActions";
import {Redirect, withRouter} from "react-router-dom";
import "Views/PasswordResetPrompt/style.css"

class NewPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            password: "",
            passwordR: "",
            validated: false,
            password_changed: false,
            message: "",
            redirect: false,
            disabled: false
        };
    };

    componentDidMount() {
        const token = this.props.match.params.id;
        this.setState({
            token: token
        });
    }

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
        if (this.state.redirect === true)
            return <Redirect to="/login" />
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {token, password, passwordR} = this.state;
        const form = e.currentTarget;
        this.setState({
            disabled: true,
            message: ""
        });
        if (form.checkValidity() === false || password !== passwordR) {
            this.setState({
                message: "Hasła się nie zgadzają",
                disabled: false
            });
        } else {
            const data = {
                token: token,
                password: password
            };
            try {
                await handlePasswordChange(data);
                this.setState({
                    password_changed: true
                });
                this.setDelayedRedirect();
            } catch(e) {
                console.log(e);
                this.setState({
                    password_changed: false
                })
            } finally {
                this.setState({
                    validated: true,
                    disabled: false
                })
            }
        }
    };

    render() {
        const { password, passwordR, validated, message, password_changed, disabled } = this.state;
        const {handleBlur, handleSubmit, renderRedirect} = this;
        return (
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
                            <Form.Group controlId="newPassword">
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Nowe hasło"
                                    required
                                    isInvalid={message !== ""}
                                    value={password}
                                    onChange={handleBlur}
                                    minLength="8"
                                />
                            </Form.Group>
                            <Form.Group controlId="newPasswordRepeat">
                                <Form.Control
                                    name="passwordR"
                                    type="password"
                                    placeholder="Powtórz hasło"
                                    required
                                    isInvalid={message !== ""}
                                    value={passwordR}
                                    onChange={handleBlur}
                                    minLength="8"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" className="loginPage__button" disabled={disabled} type="submit">{disabled ? "Ładowanie..." : "Wyślij"}</Button>
                        </Form>
                        <div className="message_pass_changed">
                            {
                                validated ? (password_changed ? <Alert variant="success" className="msgText_correct">Hasło zostało zmienione. Przekierowuję...</Alert> :
                                    <Alert variant="danger" className="msgText_fail">Coś poszło nie tak. Upewnij się, że Twój token nie wygasł.</Alert>) :
                                    null
                            }
                        </div>
                        {renderRedirect()}
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default withRouter(NewPasswordPage);
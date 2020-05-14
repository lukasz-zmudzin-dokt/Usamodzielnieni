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
            password_changed: undefined,
            message: "",
            redirect: false
        };
    };

    componentDidMount() {
        const token = this.props.match.params.id;
        this.setState({
            token: token
        });
    }

    validatePassword = (new_password, new_passwordR) => {
        if (new_password !== new_passwordR)
            return "Hasła się nie zgadzają!";
        else if (new_password.length < 8)
            return "Hasło jest za krótkie!";
        else {
            return null;
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
        if (this.state.redirect === true)
            return <Redirect to="/login" />
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {token, password, passwordR} = this.state;
        const password_msg = this.validatePassword(password, passwordR);
        const form = e.currentTarget;
        if (form.checkValidity() === false || password_msg !== null) {
            this.setState({
                validated: false,
                message: password_msg
            });
        } else {
            this.setState({
                validated: true
            });
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
            }
        }
    };

    render() {
        const { password, passwordR, validated, message, password_changed } = this.state;
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
                            className="primary"
                        >
                            <Form.Group controlId="newPassword">
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Nowe hasło"
                                    required
                                    defaultValue={password}
                                    onChange={e => handleBlur(e)}
                                    className="loginPage__input"
                                    minLength="8"
                                />
                            </Form.Group>
                            <Form.Group controlId="newPasswordRepeat">
                                <Form.Control
                                    name="passwordR"
                                    type="password"
                                    placeholder="Powtórz hasło"
                                    required
                                    defaultValue={passwordR}
                                    onChange={e => handleBlur(e)}
                                    className="loginPage__input"
                                    minLength="8"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" className="loginPage__button" data-testid="btn_change_pass" type="submit">Wyślij</Button>
                        </Form>
                        <div className="message_pass_changed" data-testid="passMsg">
                            {
                                password_changed ? (password_changed === true ? <Alert variant="success" className="msgText_correct">Hasło zostało zmienione. Przekierowuję...</Alert> :
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
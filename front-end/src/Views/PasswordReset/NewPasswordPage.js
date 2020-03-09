import React from "react";
import bgImage from "../../assets/fot..png";
import {Button, Card, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {handleBlur, handlePasswordChange, validatePassword} from "./functions/handlers";

class NewPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username || "",
            new_password: undefined,
            new_passwordR: undefined,
            validated: false
        }
    }

    render() {
        const { username, new_password, new_passwordR } = this.state;
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
                                    type="password"
                                    placeholder="Hasło"
                                    required
                                    defaultValue={new_password}
                                    onBlur={e => handleBlur(this, e, "new_password")}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="Powtórz hasło"
                                    required
                                    defaultValue={new_passwordR}
                                    onBlur={e => handleBlur(this, e, "new_passwordR")}
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
import React from "react";
import bgImage from "../../assets/fot..png";
import {Button, Card, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import {handleBlur, handleSubmit} from "./functions/handlers";

class PasswordResetPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            validated: false
        }
    };

    render() {
        let {username, validated} = this.state;
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
                            validated={validated}
                            onSubmit={handleSubmit(this)}
                            className="primary"
                        >
                            <Form.Group controlId="formGroupUsername">
                                <Form.Control
                                    type="text"
                                    placeholder="Login"
                                    required
                                    defaultValue={username}
                                    onBlur={e => handleBlur(this, e, "username")}
                                    className="loginPage__input"
                                    minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj właściwy login
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Wyślij</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default PasswordResetPrompt;
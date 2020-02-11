import {Card, Form} from "react-bootstrap";
import React from "react";
import {onChange} from "../functions/handlers";

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            passwordR: "",
            areEqual: true
        };
        onChange.bind(this);
    };

    render() {
        const { email, username, password, passwordR, areEqual } = this.state;
        return (
            <Card bg="light" className="loginPage__cardSection col-lg ">
                <Card.Header as="h4" className="">
                    Dane konta
                </Card.Header>
                <Card.Body className="">
                    <Form.Group controlId="formGroupEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            required
                            defaultValue={email}
                            onChange={e => onChange(this, e, "email")}
                            className="loginPage__input"
                            maxLength="50"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj właściwy email
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupUsername">
                        <Form.Control
                            type="text"
                            autoComplete="on"
                            placeholder="Nazwa użytkownika"
                            defaultValue={username}
                            onChange={e => onChange(this, e, "username")}
                            required
                            minLength="6"
                            maxLength="20"
                        />
                        <Form.Control.Feedback type="invalid">
                            Minimalna ilośc znaków: 6
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control
                            type="password"
                            autoComplete="on"
                            placeholder="Hasło"
                            defaultValue={password}
                            onChange={e => onChange(this, e, "password")}
                            required
                            minLength="6"
                            maxLength="30"
                        />

                        <Form.Control.Feedback type="invalid">
                            Minimalna ilośc znaków: 6
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPasswordRepeat">
                        <Form.Control
                            type="password"
                            autoComplete="on"
                            placeholder="Powtórz hasło"
                            defaultValue={passwordR}
                            onChange={e => onChange(this, e, "passwordR")}
                            required
                            minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                            Minimalna ilośc znaków: 6
                        </Form.Control.Feedback>
                        {!areEqual ? (
                            <small className="invalidMessage">
                                Hasła są odpowiedniej długości, ale nie są takie same
                            </small>
                        ) : (
                            ""
                        )}
                    </Form.Group>
                </Card.Body>
            </Card>
        );
    }
}

export default AccountForm;
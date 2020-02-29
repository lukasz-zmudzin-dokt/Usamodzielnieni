import {Card, Form} from "react-bootstrap";
import React from "react";
import {onChange} from "../functions/handlers";

const AccountForm = ({component}) => {
    const { email, username, password, passwordR, areEqual } = component.state;
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
                        onBlur={e => onChange(component, e, "email")}
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
                        onBlur={e => onChange(component, e, "username")}
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
                        onBlur={e => onChange(component, e, "password")}
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
                        onBlur={e => onChange(component, e, "passwordR")}
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
};

export default AccountForm;
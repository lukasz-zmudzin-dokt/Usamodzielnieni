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
        }
    }

    render() {
        let { email, username, passwordR, password, areEqual } = this.state;
        let {data, onBlur} = this.props;
        return(
            <Card bg="light" className="loginPage__cardSection col-lg ">
                <Card.Header as="h4" className="">
                    Dane konta
                </Card.Header>
                <Card.Body className="">
                    <Form.Group controlId="formGroupEmail">
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            defaultValue={email}
                            onBlur={e => onChange(onBlur, data, e)}
                            className="loginPage__input"
                            maxLength="50"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj właściwy email
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupUsername">
                        <Form.Control
                            name="username"
                            type="text"
                            autoComplete="on"
                            placeholder="Nazwa użytkownika"
                            defaultValue={username}
                            onBlur={e => onChange(onBlur, data, e)}
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
                            name="password"
                            type="password"
                            autoComplete="on"
                            placeholder="Hasło"
                            defaultValue={password}
                            onBlur={e => onChange(onBlur, data, e)}
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
                            name="passwordR"
                            type="password"
                            autoComplete="on"
                            placeholder="Powtórz hasło"
                            defaultValue={passwordR}
                            onBlur={e => onChange(onBlur, data, e)}
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
        )
    }
}



export default AccountForm;
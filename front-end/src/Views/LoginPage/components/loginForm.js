import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { onChange } from "../functions/handlers";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const component = this.props.component;
        const { username, password } = component;

        return (
            <Card
                bg="light"
                className="loginPage__cardSection col-lg mr-lg-3"
            >
                <Card.Body className="">
                    <Form.Group controlId="formGroupUsername">
                        <Form.Control
                            type="text"
                            placeholder="Login"
                            required
                            value={username}
                            onChange={e => onChange(component, e)}
                            className="loginPage__input"
                            minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj właściwy login
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control
                            type="password"
                            autoComplete="on"
                            placeholder="Hasło"
                            value={password}
                            onChange={e => onChange(component, e)}
                            required
                            minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj właściwe hasło
                        </Form.Control.Feedback>
                    </Form.Group>
                </Card.Body>
            </Card>
        )
    }


}

export default LoginForm;
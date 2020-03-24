import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { onChange } from "../functions/handlers";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        const {username, password} = this.state;
        const {data, onBlur} = this.props;

        return (
            <Card
                bg="light"
                className="loginPage__cardSection col-lg mr-lg-3"
            >
                <Card.Body className="">
                    <Form.Group controlId="formGroupUsername">
                        <Form.Control
                            name="login"
                            type="text"
                            placeholder="Login"
                            required
                            defaultValue={username}
                            onChange={e => onChange(onBlur, data, e)}
                            className="loginPage__input"
                            minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj właściwy login
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control
                            name="password"
                            type="password"
                            autoComplete="on"
                            placeholder="Hasło"
                            defaultValue={password}
                            onChange={e => onChange(onBlur, data, e)}
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
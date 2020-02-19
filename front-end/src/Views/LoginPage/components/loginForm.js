import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { onChange } from "../functions/handlers";
import { sendBackData } from "../functions/handlers";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        onChange.bind(this);
    }

    sendBackData = () => {
        this.props.parentCallback(this.state.username, this.state.password);
    }

    render() {
        const { username, password } = this.state;

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
                            onChange={e => {onChange(this, e); sendBackData(this)}}
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
                            onChange={e => {onChange(this, e); sendBackData(this)}}
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
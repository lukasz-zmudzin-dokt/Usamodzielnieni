import React from 'react';
import { Card, Form } from 'react-bootstrap';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onChange = (e) => {
        let {onBlur, data} = this.props;
        const type = e.target.type === "text" ? "username" : e.target.type;

        const value = e.target.value;
        onBlur({...data, [type]:value});
    };

    render() {
        const {username, password} = this.state;
        const { onChange } = this;

        return (
            <Card
                bg="light"
                className="loginPage__cardSection col-lg mr-lg-3"
            >
                <Card.Body className="">
                    <Form.Group controlId="formGroupUsername">
                        <Form.Control
                            data-testid="loginPage_login"
                            name="login"
                            type="text"
                            placeholder="Login"
                            required
                            defaultValue={username}
                            onBlur={e => onChange(e)}
                            className="loginPage__input"
                            minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj login
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control
                            data-testid="loginPage_password"
                            name="password"
                            type="password"
                            autoComplete="on"
                            placeholder="Hasło"
                            defaultValue={password}
                            onBlur={e => onChange(e)}
                            required
                            minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj hasło
                        </Form.Control.Feedback>
                    </Form.Group>
                </Card.Body>
            </Card>
        )
    }


}

export default LoginForm;
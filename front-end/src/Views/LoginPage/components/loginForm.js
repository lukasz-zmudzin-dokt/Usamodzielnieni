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
        const type = e.target.name;

        const value = e.target.value;
        this.setState({
            [type]: value
        });
        onBlur({...data, [type]:value});
    };

    render() {
        const {username, password} = this.state;
        const { onChange } = this;

        return (
            <div>
                <Form.Group controlId="formGroupUsername">
                    <Form.Control
                        data-testid="loginPage_login"
                        name="username"
                        type="text"
                        placeholder="Login"
                        required
                        defaultValue={username}
                        onChange={e => onChange(e)}
                        className="loginPage__input"
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
                        placeholder="Hasło"
                        defaultValue={password}
                        onChange={e => onChange(e)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Podaj hasło
                    </Form.Control.Feedback>
                </Form.Group>
            </div>
        )
    }


}

export default LoginForm;
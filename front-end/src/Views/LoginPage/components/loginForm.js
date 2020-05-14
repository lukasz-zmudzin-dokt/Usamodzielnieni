import React from "react";
import { Form } from "react-bootstrap";

class LoginForm extends React.Component {
  onChange = (e) => {
    let { onBlur, data } = this.props;
    const type = e.target.name;

    const value = e.target.value;
    this.setState({
      [type]: value,
    });
    onBlur({ ...data, [type]: value });
  };

  render() {
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
            onChange={(e) => onChange(e)}
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
            onChange={(e) => onChange(e)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Podaj hasło
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    );
  }
}

export default LoginForm;

import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "Views/LoginPage/style.css";

class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
    validated: false
  };

  onChange = e => {
    const type = e.target.type;
    const value = e.target.value;
    this.setState({
      [type]: value
    });
  };

  handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({
      validated: true
    });
  };

  render() {
    const { email, password, validated } = this.state;
    const { onChange, handleSubmit } = this;
    return (
      <Container className="container">
        <h1 className="display-4">Logowanie</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Podaj właściwy email
            </Form.Control.Feedback>
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              autoComplete="on"
              placeholder="Password"
              value={password}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Podaj właściwe hasło
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </Container>
    );
  }
}

export default LoginPage;

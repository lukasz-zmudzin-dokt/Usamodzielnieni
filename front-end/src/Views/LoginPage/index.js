import React from "react";
import { Container, Button, Card, ButtonGroup, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "Views/LoginPage/style.css";
import bgImage from "assets/fot..png";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    cookieVal: false,
    validated: false
  };

  onChange = e => {
    const type = e.target.type === "text" ? "username" : e.target.type;

    const value = e.target.value;
    this.setState({
      [type]: value
    });
  };

  setCookie = () => {
    const { username } = this.state;
    const cookies = new Cookies();
    cookies.set(`${username}`, "loggedIn", { path: "/" });
  };

  handleCheck = e => {
    this.setState({
      cookieVal: e.target.checked
    });
  };

  handleSubmit = event => {
    const form = event.currentTarget;
    const { password, username, cookieVal } = this.state;
    const { setCookie } = this;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (cookieVal) {
        setCookie();
      }
      console.log(password, username); // login i hasło użytkownika
    }

    this.setState({
      validated: true
    });
  };

  render() {
    const { username, password, validated, cookieVal } = this.state;
    const { onChange, handleSubmit, handleCheck } = this;
    console.log(window.innerWidth);
    return (
      <Container className="loginPage">
        {window.innerWidth >= 768 ? (
          <img className="loginPage__bgImage" src={bgImage} />
        ) : null}
        <Card className="loginPage__card">
          <Card.Header as="h2">Logowanie</Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="primary"
            >
              <Form.Group controlId="formGroupUsername">
                <Form.Control
                  type="text"
                  placeholder="Login"
                  required
                  value={username}
                  onChange={onChange}
                  className="loginPage__input"
                  minLength="6"
                />
                <Form.Control.Feedback type="invalid">
                  Podaj właściwy email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Control
                  type="password"
                  autoComplete="on"
                  placeholder="Hasło"
                  value={password}
                  onChange={onChange}
                  required
                  minLength="6"
                />
                <Form.Control.Feedback type="invalid">
                  Podaj właściwe hasło
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  checked={cookieVal}
                  onChange={handleCheck}
                  label="Zapamiętaj mnie"
                />
              </Form.Group>
              <Button variant="secondary">Zaloguj</Button>
            </Form>
            <div className="loginPage__links">
              <Link to="/newAccount">Rejestracja</Link>
              <Link to="/newPassword">Zapomniałeś hasła?</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default LoginPage;

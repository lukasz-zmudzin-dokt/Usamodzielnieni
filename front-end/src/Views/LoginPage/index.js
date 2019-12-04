import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import Cookies from "universal-cookie";
import Form from "react-bootstrap/Form";
import { Link, Redirect } from "react-router-dom";

import "Views/LoginPage/style.css";
import bgImage from "assets/fot..png";

const cookies = new Cookies();

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    redirect: false,
    incorrect: false,
    cookieVal: false,
    validated: false
  };

  sendData = object => {
    const { username, password } = this.state;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://34973d4d.ngrok.io/account/login/";
    const response = fetch(proxyurl + url, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        this.setRedirect();
      } else {
        this.setState({
          validated: false,
          incorrect: true,
          username: "",
          password: ""
        });
      }
    });
  };

  onChange = e => {
    const type = e.target.type === "text" ? "username" : e.target.type;

    const value = e.target.value;
    this.setState({
      [type]: value
    });
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  setCookie = () => {
    const { username } = this.state;
    const current = new Date();
    const nextYear = new Date();

    nextYear.setFullYear(current.getFullYear() + 1); // ciasteczko na rok

    cookies.set(`username`, username, {
      path: "/",
      expires: nextYear
    });
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
      this.sendData();
      console.log(password, username); // login i hasło użytkownika
    }

    this.setState({
      validated: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/user" />;
    }
  };

  componentDidMount() {
    if (cookies.get("username")) {
      this.setRedirect();
    }
  }

  render() {
    const { username, password, validated, cookieVal, incorrect } = this.state;
    const { onChange, handleSubmit, handleCheck } = this;
    console.log(window.innerWidth);
    return (
      <Container className="loginPage">
        {window.innerWidth >= 768 ? (
          <img className="loginPage__bgImage" src={bgImage} alt="tło" />
        ) : null}
        <Card className="loginPage__card">
          <Card.Header as="h2" className="loginPage__header">
            Logowanie
          </Card.Header>
          <Card.Body className="loginPage__body">
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
                  Podaj właściwy login
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

              <Button
                variant="secondary"
                className="loginPage__button"
                type="submit"
              >
                Zaloguj
              </Button>
            </Form>
            {incorrect ? (
              <div className="loginPage__messageFail">
                <small className="loginPage__failure">
                  Nieprawidłowe hasło lub login.
                </small>
              </div>
            ) : null}
            <div className="loginPage__links">
              <Link to="/newAccount">Załóż konto!</Link>
              {this.renderRedirect()}
              {/* <Link to="/newPassword">Zapomniałeś hasła?</Link> */}
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default LoginPage;

import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "context";

import "Views/LoginPage/style.css";
import bgImage from "../../assets/fot..png";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    message: "",
    redirect: false,
    incorrect: false,
    cookieVal: false,
    validated: false
  };

  createMessage = status => {
    if (status === 400) {
      this.setState({
        message: "Niepoprawny login lub hasło"
      });
    } else {
      this.setState({
        message: "Nieznany błąd proszę spróbować później"
      });
    }
  };

  sendData = object => {
    const { username, password } = this.state;

    const url = "https://usamo-back.herokuapp.com/account/login/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        "Content-Type": "application/json",
        Origin: null
      }
    }).then(res => {
      console.log(res);
      if (res.status === 201) {
        res.json().then(responseValue => {
          const { token, type } = responseValue;
          this.context.login(token, type);
          this.setRedirect();
        });
      } else {
        this.setState({
          validated: false,
          incorrect: true,
          username: "",
          password: "",
          message: "Coś poszło nie tak"
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

  handleCheck = e => {
    this.setState({
      cookieVal: e.target.checked
    });
  };

  handleSubmit = event => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.sendData();
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
    if (this.context.token) {
      this.setRedirect();
    }
  }

  render() {
    const {
      username,
      password,
      validated,
      cookieVal,
      incorrect,
      message
    } = this.state;
    const { onChange, handleSubmit, handleCheck } = this;

    return (
      <Container className="loginPage">
        {window.innerWidth >= 768 ? (
          <img className="loginPage__bgImage" src={bgImage} alt="tło" />
        ) : null}
        <Card className="loginPage__card loginPage__card--login">
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
                <small className="loginPage__failure">{message}</small>
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

LoginPage.contextType = UserContext;

export default LoginPage;

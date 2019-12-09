import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import bgImage from "assets/fot..png";

class RegisterPage extends React.Component {
  state = {
    newUser: {},
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    password: "",
    passwordR: "",
    areEqual: true,
    validated: false,
    incorrect: false,
    correct: false,
    message: ""
  };

  onChange = (e, val) => {
    const value = e.target.value;

    this.setState({
      [val]: value
    });
  };

  sendData = object => {
    console.log(object);
    const url = "https://usamo-back.herokuapp.com/account/register/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
        Origin: null
      }
    }).then(res => {
      console.log(res.status);
      if (res.status === 201) {
        this.setState({
          validated: false,
          message: "Udało się zarejestrować! Teraz możesz się zalogować",
          email: "",
          first_name: "",
          last_name: "",
          username: "",
          phone_number: "",
          password: "",
          passwordR: "",
          correct: true
        });
      } else {
        this.setState({
          validated: false,
          incorrect: true,
          message: "Taki użytkownik juz istnieje",
          username: ""
        });
      }
    });
  };

  handleSubmit = event => {
    const {
      email,
      first_name,
      last_name,
      username,
      phone_number,
      password,
      passwordR
    } = this.state;
    const form = event.currentTarget;

    event.preventDefault();

    console.log(form.checkValidity());

    if (form.checkValidity() === false || password !== passwordR) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true && password !== passwordR) {
      this.setState({
        areEqual: false
      });
    } else {
      this.setState({
        areEqual: true
      });
      this.setState({
        newUser: {
          email,
          first_name,
          last_name,
          username,
          phone_number,
          password
        }
      });
      this.sendData({
        email,
        first_name,
        last_name,
        username,
        phone_number,
        password
      });
    }

    this.setState({
      validated: true
    });
  };

  render() {
    const {
      email,
      first_name,
      last_name,
      username,
      phone_number,
      password,
      passwordR,
      areEqual,
      validated,
      incorrect,
      message,
      correct
    } = this.state;
    const { onChange, handleSubmit } = this;
    return (
      <Container className="loginPage loginPage__register">
        {window.innerWidth >= 768 ? (
          <img className="loginPage__bgImage" src={bgImage} alt="Tło" />
        ) : null}
        <Card className="loginPage__card">
          <Card.Header as="h2" className="loginPage__header">
            Rejestracja
          </Card.Header>
          <Card.Body className="loginPage__body">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="primary"
            ></Form>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="loginPage__form primary"
            >
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={e => onChange(e, "email")}
                  className="loginPage__input"
                  maxLength="50"
                />
                <Form.Control.Feedback type="invalid">
                  Podaj właściwy email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupFirstName">
                <Form.Control
                  type="text"
                  autoComplete="on"
                  placeholder="Imię"
                  value={first_name}
                  onChange={e => onChange(e, "first_name")}
                  required
                  minLength="1"
                  maxLength="30"
                />
                <Form.Control.Feedback type="invalid">
                  Podaj imię
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupLastName">
                <Form.Control
                  type="text"
                  autoComplete="on"
                  placeholder="Nazwisko"
                  value={last_name}
                  onChange={e => onChange(e, "last_name")}
                  required
                  minLength="1"
                  maxLength="30"
                />
                <Form.Control.Feedback type="invalid">
                  Podaj nazwisko
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupUsername">
                <Form.Control
                  type="text"
                  autoComplete="on"
                  placeholder="Nazwa użytkownika"
                  value={username}
                  onChange={e => onChange(e, "username")}
                  required
                  minLength="6"
                  maxLength="20"
                />
                <Form.Control.Feedback type="invalid">
                  Minimalna ilośc znaków: 6
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPhoneNumber">
                <Form.Control
                  type="tel"
                  pattern="[+]{1}[4]{1}[8]{1}[0-9]{3}[0-9]{3}[0-9]{3}"
                  autoComplete="on"
                  placeholder="Numer telefonu"
                  value={phone_number}
                  onChange={e => onChange(e, "phone_number")}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Podaj numer telefonu w formacie: +48123123123
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Control
                  type="password"
                  autoComplete="on"
                  placeholder="Hasło"
                  value={password}
                  onChange={e => onChange(e, "password")}
                  required
                  minLength="6"
                  maxLength="30"
                />

                <Form.Control.Feedback type="invalid">
                  Minimalna ilośc znaków: 6
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPasswordRepeat">
                <Form.Control
                  type="password"
                  autoComplete="on"
                  placeholder="Powtórz hasło"
                  value={passwordR}
                  onChange={e => onChange(e, "passwordR")}
                  required
                  minLength="6"
                />
                <Form.Control.Feedback type="invalid">
                  Minimalna ilośc znaków: 6
                </Form.Control.Feedback>
                {!areEqual ? (
                  <small className="invalidMessage">
                    Hasła są odpowiedniej długości, ale nie są takie same
                  </small>
                ) : (
                  ""
                )}
              </Form.Group>
              <Button
                variant="secondary"
                className="loginPage__button"
                type="submit"
              >
                Utwórz konto
              </Button>
            </Form>
            {incorrect ? (
              <div className="loginPage__messageFail">
                <small className="loginPage__failure">{message}</small>
              </div>
            ) : null}
            {correct ? (
              <div className="loginPage__messageFail">
                <small className="loginPage__correct">{message}</small>
              </div>
            ) : null}
            <div className="loginPage__links">
              <Link to="/login" className="loginPage__link">
                Masz już konto? Zaloguj się!
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default RegisterPage;

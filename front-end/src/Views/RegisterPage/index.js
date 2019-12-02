import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import bgImage from "assets/fot..png";

class RegisterPage extends React.Component {
  state = {
    newUser: {},
    email: "", // przechowywanie maila
    first_name: "", // imie
    last_name: "", //nazwisko
    username: "", //nazwa uzytkownika
    phone_number: "", // numer telefonu
    password: "", // przechowywanie hasła
    passwordR: "", // przechowywanie powtórzenia hasła
    areEqual: true,
    validated: false // przechowywanie stanu czy ktoś juz kliknął przycisk walidacji czy nie
  };

  onChange = (e, val) => {
    const value = e.target.value;

    this.setState({
      [val]: value
    });
  };

  // Funkcja podsumowująca formularz
  handleSubmit = event => {
    const {
      email,
      first_name,
      last_name,
      username,
      phone_number,
      password,
      passwordR
    } = this.state; // destrukturyzacja stanu,maila
    const form = event.currentTarget; // formularz

    event.preventDefault(); // zapobiega odświeżaniu strony

    //Sprawdzenie czy formularz został poprawnie uzupełniony
    console.log(form.checkValidity());

    if (form.checkValidity() === false || password !== passwordR) {
      event.preventDefault();
      event.stopPropagation(); // zatrzymuje event
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
      console.log({
        email,
        first_name,
        last_name,
        username,
        phone_number,
        password
      });
    }

    // przycisk został kliknięty więc zmieniamy stan
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
      validated
    } = this.state;
    const { onChange, handleSubmit } = this;
    return (
      <Container className="loginPage">
        {window.innerWidth >= 768 ? (
          <img className="loginPage__bgImage" src={bgImage} />
        ) : null}
        <Card className="loginPage__card">
          <Card.Header as="h2">Rejestracja</Card.Header>
          <Card.Body>
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
              <Button variant="secondary">Utwórz konto</Button>
            </Form>

            <div className="loginPage__links">
              <Link to="/" className="loginPage__link">
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

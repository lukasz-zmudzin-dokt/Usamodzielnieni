import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class RegisterPage extends React.Component {
  state = {
    email: "", // przechowywanie maila
    password: "", // przechowywanie hasła
    passwordR: "", // przechowywanie powtórzenia hasła
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
    const form = event.currentTarget; // formularz
    const { password, email, passwordR } = this.state; // destrukturyzacja stanu,maila
    event.preventDefault(); // zapobiega odświeżaniu strony

    //Sprawdzenie czy formularz został poprawnie uzupełniony
    console.log(form.checkValidity());
    if (form.checkValidity() === false || password !== passwordR) {
      event.preventDefault();
      event.stopPropagation(); // zatrzymuje event
    } else {
      console.log(password, email); // jezeli wszystko okej wyswietla stan(w przyszlosci bedzie przekazywany do backendu)
    }

    // przycisk został kliknięty więc zmieniamy stan
    this.setState({
      validated: true
    });
  };

  render() {
    const { email, password, passwordR, validated } = this.state; // destrukturyzacja stanu,emaila
    const { onChange, handleSubmit } = this;
    return (
      <Container className="loginPage">
        <h1 className="display-4">Rejestracja</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="loginPage__form primary"
        >
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={e => onChange(e, "email")}
              className="loginPage__input"
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
              onChange={e => onChange(e, "password")}
              required
              minLength="6"
            />
            <Form.Control.Feedback type="invalid">
              Podaj właściwe hasło
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formGroupPasswordRepeat">
            <Form.Label>Powtórz hasło</Form.Label>
            <Form.Control
              type="password"
              autoComplete="on"
              placeholder="Repeat password"
              value={passwordR}
              onChange={e => onChange(e, "passwordR")}
              required
              minLength="6"
            />
            <Form.Control.Feedback type="invalid">
              Podaj właściwe hasło
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Utwórz konto</Button>
        </Form>
        <section className="loginPage__links">
          <Link to="/" className="loginPage__link">
            Masz już konto? Zaloguj się!
          </Link>
        </section>
      </Container>
    );
  }
}

export default RegisterPage;

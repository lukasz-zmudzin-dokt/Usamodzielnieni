import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "Views/LoginPage/style.css";

class LoginPage extends React.Component {
  state = {
    email: "", // przechowywanie maila
    password: "", // przechowywanie hasła
    validated: false // przechowywanie stanu czy ktoś juz kliknął przycisk walidacji czy nie
  };

  // Funkcja przechowująca aktualne wartości wpisanego maila,hasła
  onChange = e => {
    const type = e.target.type;
    const value = e.target.value;
    this.setState({
      [type]: value
    });
  };

  // Funkcja podsumowująca formularz
  handleSubmit = event => {
    const form = event.currentTarget; // formularz
    const { password, email } = this.state; // destrukturyzacja stanu,maila
    event.preventDefault(); // zapobiega odświeżaniu strony

    //Sprawdzenie czy formularz został poprawnie uzupełniony
    if (form.checkValidity() === false) {
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
    const { email, password, validated } = this.state; // destrukturyzacja stanu,emaila
    const { onChange, handleSubmit } = this; // destrukturyzacja funkcji
    return (
      <Container className="loginPage">
        <h1 className="display-4">Logowanie</h1>
        <section className="loginPage__media">
          <button className="media__button media__button--facebook">
            Facebook
          </button>
          <button className="media__button media__button--google">
            Google
          </button>
        </section>
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
              onChange={onChange}
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
              onChange={onChange}
              required
              minLength="6"
            />
            <Form.Control.Feedback type="invalid">
              Podaj właściwe hasło
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Zaloguj</Button>
        </Form>
        <section className="loginPage__links">
          <Link to="/newPassword" className="loginPage__link">
            Zapomniałeś hasła?
          </Link>
          <Link to="/newAccount" className="loginPage__link">
            Utwórz konto!
          </Link>
        </section>
      </Container>
    );
  }
}

export default LoginPage;

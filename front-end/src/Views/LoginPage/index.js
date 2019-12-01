import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "Views/LoginPage/style.css";

class LoginPage extends React.Component {
  state = {
    username: "", // przechowywanie nazwy uzytkownika
    password: "", // przechowywanie hasła
    validated: false // przechowywanie stanu czy ktoś juz kliknął przycisk walidacji czy nie
  };

  // Funkcja przechowująca aktualne wartości wpisanego maila,hasła
  onChange = e => {
    const type = e.target.type === "email" ? e.target.type : "username";
    const value = e.target.value;
    this.setState({
      [type]: value
    });
  };

  // Funkcja podsumowująca formularz
  handleSubmit = event => {
    const form = event.currentTarget; // formularz
    const { password, username } = this.state; // destrukturyzacja stanu,maila
    event.preventDefault(); // zapobiega odświeżaniu strony

    //Sprawdzenie czy formularz został poprawnie uzupełniony
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation(); // zatrzymuje event
    } else {
      console.log(password, username); // jezeli wszystko okej wyswietla stan(w przyszlosci bedzie przekazywany do backendu)
    }

    // przycisk został kliknięty więc zmieniamy stan
    this.setState({
      validated: true
    });
  };

  render() {
    const { username, password, validated } = this.state; // destrukturyzacja stanu,emaila
    const { onChange, handleSubmit } = this; // destrukturyzacja funkcji
    return (
      <Container className="loginPage">
        {/* <section className="loginPage__media">
          <button className="media__button media__button--facebook">
            Facebook
          </button>
          <button className="media__button media__button--google">
            Google
          </button>
        </section> */}

        <div className="contentContainer__title">
          <h2 className="title__text">Logowanie</h2>
        </div>
        <section className="contentContainer__formContainer">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="loginPage__form primary"
          >
            <Form.Group controlId="formGroupUsername">
              {/* <Form.Label>Email:</Form.Label> */}
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
              {/* <Form.Label>Hasło</Form.Label> */}
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
            <section className="loginButton__section">
              <button className="loginButton loginButton--type1">
                <Link to="/newAccount" className="loginPage__link">
                  Rejestracja
                </Link>
              </button>
              <button type="submit" className="loginButton loginButton--type2">
                Zaloguj
              </button>
              <button className="loginButton loginButton--type3">
                <Link
                  to="/newPassword"
                  className="loginPage__link loginPage__link--white"
                >
                  Zapomniałeś hasła?
                </Link>
              </button>
            </section>
          </Form>
        </section>
      </Container>
    );
  }
}

export default LoginPage;

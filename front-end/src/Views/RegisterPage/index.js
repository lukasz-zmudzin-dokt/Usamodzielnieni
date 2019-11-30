import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class RegisterPage extends React.Component {
  state = {
    email: "", // przechowywanie maila
    first_name: "", // imie
    last_name: "", //nazwisko
    username: "", //nazwa uzytkownika
    phone_number: "", // numer telefonu
    password: "", // przechowywanie hasła
    passwordR: "", // przechowywanie powtórzenia hasła
    areEqual: false,
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
    } = this.state; // destrukturyzacja stanu,emaila
    const { onChange, handleSubmit } = this;
    return (
      <Container className="loginPage">
        <div className="contentContainer__title contentContainer__title--register">
          <h2 className="title__text">Rejestracja</h2>
        </div>
        <section className="contentContainer__formContainer">
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
            </Form.Group>
            <section className="loginButton__section">
              <button className="loginButton loginButton--type1">
                <Link to="/" className="loginPage__link">
                  Logowanie
                </Link>
              </button>
              <button type="submit" className="loginButton loginButton--type2">
                Utwórz
              </button>
            </section>
          </Form>
        </section>
        {/* <section className="loginPage__links">
          <Link to="/" className="loginPage__link">
            Masz już konto? Zaloguj się!
          </Link>
        </section> */}
      </Container>
    );
  }
}

export default RegisterPage;

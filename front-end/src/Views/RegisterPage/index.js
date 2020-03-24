import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import bgImage from "../../assets/fot..png";
import { UserContext } from "context";

class RegisterPage extends React.Component {
  state = {
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    name_of_place: "",
    street: "",
    city: "",
    city_code: "",
    password: "",
    passwordR: "",
    areEqual: true,
    validated: false,
    redirect: false
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/user" />;
    }
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
      console.log(res);
      if (res.status === 201) {
        res.json().then(responseValue => {
          const { token } = responseValue;
          this.setRedirect();
          this.context.login(token);
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
            city: "",
            city_code: "",
            street: "",
            name_of_place: "",
            correct: true,
            redirect: true
          });
        });
      } else {
        this.setState({
          validated: false,
          incorrect: true,
          message: "Taki użytkownik już istnieje",
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
      city,
      city_code,
      street,
      name_of_place,
      password,
      passwordR
    } = this.state;
    const form = event.currentTarget;

    event.preventDefault();

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
      const facility_name = name_of_place;
      const facility_address = `${city} ${street} ${city_code}`;
      console.log({
        email,
        first_name,
        last_name,
        username,
        phone_number,
        password,
        facility_name,
        facility_address
      });
      this.sendData({
        email,
        first_name,
        last_name,
        username,
        phone_number,
        password,
        facility_name,
        facility_address
      });
    }

    this.setState({
      validated: true
    });
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    const {
      validated,
      incorrect,
      message,
      correct,
    } = this.state;
    const { handleSubmit } = this;
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
              onSubmit={e => handleSubmit(this, e)}
              className="loginPage__form primary"
            >
              <section className="row">
                <PersonalDataForm/>
                <HomeDataForm/>
                <AccountForm/>
              </section>
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
        {renderRedirect(this)}
      </Container>
    );
  }
}

RegisterPage.contextType = UserContext;
                
export default RegisterPage;

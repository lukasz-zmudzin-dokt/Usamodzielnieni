import React from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import {
  HomeDataForm,
  PersonalDataForm,
  CompanyDataForm,
  AccountForm
} from "./components";
import { UserContext } from "context";
import { sendData } from "./functions/sendData";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalData: null,
      homeData: null,
      companyData: null,
      accountData: null,

      account_type: window.location.pathname !== "/staff/register" ? "Podopiecznym" : "Weryfikacja użytkowników",
      validated: false,
      redirect: false,
      fail_message: "",
      error_flag: false,
      incorrect_input: false,
      disabled: false
    };
  }

  handleIncorrectResponse = status => {
    switch (status) {
      case 400:
        return "Niepoprawne dane. Spróbuj jeszcze raz.";
      case 500:
        return "Błąd serwera. Spróbuj ponownie za jakiś czas.";
      default:
        return "Nieznany błąd.";
    }
  };

  handleSubmit = (data, event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const { password, passwordR } = data.accountData || {};

    if (form.checkValidity() === false || password !== passwordR) {
      event.stopPropagation();
      return false;
    } else return !(form.checkValidity() === true && password !== passwordR);
  };

  selectType = e => {
    this.setState({
      account_type: e.target.value
    });
  };

  renderSection = () => {
      if (this.state.account_type === "Podopiecznym") {
        return (
            <HomeDataForm
                data={this.state.homeData}
                onBlur={homeData => this.setState({ homeData })}
            />
        );
      } else if (this.state.account_type === "Pracodawcą") {
        return (
            <CompanyDataForm
                data={this.state.companyData}
                onBlur={companyData => this.setState({ companyData })}
            />
        );
      }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  setValidated = () => {
    this.setState({
      validated: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/user" />;
    }
  };

  getFacilityAddress = (city, street, cityCode) => `${city} ${street} ${cityCode}`;

  handleResponse = async e => {
    this.setState({ disabled: true });
    const data = {
      personalData: this.state.personalData,
      homeData: this.state.homeData,
      companyData: this.state.companyData,
      accountData: this.state.accountData,
      account_type: this.state.account_type,
      account_group: this.state.account_group
    };

    const isOK = this.handleSubmit(data, e);
    this.setValidated();
    if (isOK) {
      try {
        const contextData = await sendData(data).then(response => {
          return response;
        });
        const { status } = contextData;
        if (status === 201) {
          const { token, type } = contextData;
          this.context.login(token, type, {
            email: this.state.email,
            username: this.state.username,
            last_name: this.state.last_name,
            first_name: this.state.first_name,
            phone_number: this.state.phone_number,
            facility_name: this.state.name_of_place,
            facility_address: this.getFacilityAddress(this.state.city, this.state.street, this.state.city_code)
          });
          this.setRedirect();
        }
      } catch (error) {
        const msg = this.handleIncorrectResponse(error.status);
        this.setState({
          fail_message: msg,
          error_flag: true,
          disabled: false
        });
      }
    }
    this.setState({ disabled: false });
  };

  renderSelection = (isAdmin) => {
    let array;
    if (isAdmin) {
      array = ['Weryfikacja użytkowników', 'Weryfikacja CV', 'Weryfikacja ofert pracy', 'Kreator postów na blogu', 'Moderator bloga'];
    } else {
      array = ['Podopiecznym', 'Pracodawcą']
    }

    return (
      <Form.Group className="register_account_type">
        <Form.Label>{isAdmin ? "Nowa rola:" : "Jestem:"}</Form.Label>
        <Form.Control
            data-testid="typeSelector"
            className="register_radio_type"
            as="select"
            onChange={e => this.selectType(e)}
        >
          {array.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
          ))}
        </Form.Control>
      </Form.Group>
    )
  };

  render() {
    const {
      validated,
      error_flag,
      fail_message,
      accountData,
      personalData,
      redirect,
      disabled
    } = this.state;
    const { renderSelection, renderSection, handleResponse, renderRedirect } = this;
    return (
      <Container className="loginPage loginPage__register">
        <Card className="loginPage__card">
          <Card.Header as="h2" className="loginPage__header">
            Rejestracja
          </Card.Header>
          <Card.Body className="registerPage__body">
            {renderSelection(window.location.pathname.toLowerCase() === "/staff/register")}
            <Form
              noValidate
              validated={validated}
              onSubmit={e => handleResponse(e)}
              className="loginPage__form primary"
            >
              <section className="row">
                <PersonalDataForm
                  data={personalData}
                  onBlur={personalData => this.setState({ personalData })}
                />
                {renderSection()}
                <AccountForm
                  data={accountData}
                  onBlur={accountData => this.setState({ accountData })}
                />
              </section>
              <Button
                variant="primary"
                className="loginPage__button"
                type="submit"
                data-testid="submitBtn"
                disabled={disabled}
              >
                {disabled ? "Ładowanie..." : "Utwórz konto"}
              </Button>
            </Form>
            {error_flag ? (
              <Alert
                variant="danger"
                className="loginPage__failure"
                data-testid="incorrectMsg"
              >
                {fail_message}
              </Alert>
            ) : null}
            <div className="loginPage__links">
              <Link to="/login" className="loginPage__link">
                Masz już konto? Zaloguj się!
              </Link>
            </div>
          </Card.Body>
        </Card>
        {renderRedirect(redirect)}
      </Container>
    );
  }
}

RegisterPage.contextType = UserContext;

export default RegisterPage;

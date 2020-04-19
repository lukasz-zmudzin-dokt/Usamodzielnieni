import React from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import {
  HomeDataForm,
  PersonalDataForm,
  CompanyDataForm,
  AccountForm
} from "./components";
import { UserContext } from "context";
import { sendData } from "./functions/sendData";
import TypeSelection from "./components/TypeSelection/TypeSelection";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalData: null,
      homeData: null,
      companyData: null,
      accountData: null,

      account_type: this.props.match.params.role !== 'staff' ? "Podopiecznym" : "staff_verification",
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
      account_type: this.state.account_type
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
          if (this.props.match.params.role !== 'staff') {
            const { token, type, data } = contextData;
            this.context.login(token, type, data);
          }
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
    const { renderSection, handleResponse, renderRedirect } = this;
    return (
      <Container className="loginPage loginPage__register">
        <Card className="loginPage__card">
          <Card.Header as="h2" className="loginPage__header">
            Rejestracja
          </Card.Header>
          <Card.Body className="registerPage__body">
            <TypeSelection isAdmin={this.props.match.params.role === 'staff'} selectType={this.selectType}/>
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

export default withRouter(RegisterPage);

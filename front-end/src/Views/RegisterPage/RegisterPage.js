import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  HomeDataForm,
  PersonalDataForm,
  CompanyDataForm,
  AccountForm,
  TypeSelection,
} from "./components";
import { UserContext } from "context";
import { sendData } from "./functions/sendData";
import { WithAlertContext } from "components";
import { staffTypes } from "constants/staffTypes";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalData: null,
      homeData: null,
      companyData: { company_nip: "" },
      accountData: null,

      account_type:
        this.props.match.params.role !== "staff"
          ? "Podopiecznym"
          : [staffTypes.VERIFICATION],
      validated: false,
      redirect: false,
      disabled: false,
    };
  }

  handleIncorrectResponse = (status) => {
    switch (status) {
      case 400:
        this.props.alertContext.showAlert(
          "Niepoprawne dane. Spróbuj jeszcze raz."
        );
        break;
      case 500:
        this.props.alertContext.showAlert(
          "Błąd serwera. Spróbuj ponownie za jakiś czas."
        );
        break;
      default:
        this.props.alertContext.showAlert("Nieznany błąd");
    }
  };

  handleSubmit = (data, event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const { password, passwordR } = data.accountData || {};

    if (form.checkValidity() === false || password !== passwordR) {
      event.stopPropagation();
      return false;
    } else return true;
  };

  cutType = (e) => {
    let permissions = this.state.account_type;
    let itemIdx = permissions.indexOf(e.target.name);
    if (itemIdx > -1) {
      permissions.splice(itemIdx, 1);
      this.setState({
        account_types: permissions,
      });
    }
  };

  selectType = (e) => {
    if (this.props.match.params.role === "staff") {
      let permissions = this.state.account_type;
      permissions = permissions.push(e.target.name);
      this.setState({
        account_types: permissions,
      });
    } else {
      this.setState({
        account_type: e.target.value,
      });
    }
  };

  renderSection = () => {
    if (this.state.account_type === "Podopiecznym") {
      return (
        <HomeDataForm
          data={this.state.homeData}
          onBlur={(homeData) => this.setState({ homeData })}
        />
      );
    } else if (this.state.account_type === "Pracodawcą") {
      return (
        <CompanyDataForm
          data={this.state.companyData}
          onBlur={(companyData) => this.setState({ companyData })}
        />
      );
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  setValidated = () => {
    this.setState({
      validated: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/user" />;
    }
  };

  handleResponse = async (e) => {
    this.setState({ disabled: true });
    const data = {
      personalData: this.state.personalData,
      homeData: this.state.homeData,
      companyData: this.state.companyData,
      accountData: this.state.accountData,
      account_type: this.state.account_type,
    };

    const isOK = this.handleSubmit(data, e);
    this.setValidated();
    if (isOK) {
      try {
        const contextData = await sendData(this.context.token, data).then(
          (response) => {
            return response;
          }
        );
        const { status } = contextData;
        if (status === 201) {
          if (this.props.match.params.role !== "staff") {
            const { token, type, data } = contextData;
            this.context.login(token, type, data);
          }
          return this.setRedirect();
        }
      } catch (error) {
        this.handleIncorrectResponse(error.status);
      }
    }
    this.setState({ disabled: false });
  };

  render() {
    const {
      validated,
      accountData,
      personalData,
      redirect,
      disabled,
    } = this.state;
    const { renderSection, handleResponse, renderRedirect } = this;
    return (
      <Container className="loginPage loginPage__register">
        <Card className="loginPage__card">
          <Card.Header as="h2" className="loginPage__header">
            Rejestracja
          </Card.Header>
          <Card.Body className="registerPage__body">
            <TypeSelection
              isAdmin={this.props.match.params.role === "staff"}
              selectType={this.selectType}
              cutType={this.cutType}
              current={this.state.account_type}
            />
            <Form
              noValidate
              validated={validated}
              onSubmit={(e) => handleResponse(e)}
              className="loginPage__form primary"
            >
              <section className="row">
                <PersonalDataForm
                  data={personalData}
                  onBlur={(personalData) => this.setState({ personalData })}
                />
                {renderSection()}
                <AccountForm
                  data={accountData}
                  onBlur={(accountData) => this.setState({ accountData })}
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
            {this.props.match.params.role !== "staff" ? (
              <div className="loginPage__links">
                <Link to="/login" className="loginPage__link">
                  Masz już konto? Zaloguj się!
                </Link>
              </div>
            ) : null}
          </Card.Body>
        </Card>
        {renderRedirect(redirect)}
      </Container>
    );
  }
}

RegisterPage.contextType = UserContext;

export default withRouter(WithAlertContext(RegisterPage));

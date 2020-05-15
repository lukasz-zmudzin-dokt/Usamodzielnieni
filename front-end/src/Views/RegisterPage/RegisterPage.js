import React from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
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
import { getUserData } from "./functions/changeData";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.routerParam = this.props.match.params.id;
    this.state = {
      personalData: null,
      homeData: null,
      companyData: { company_nip: "" },
      accountData: null,

      account_type:
        this.props.match.params.role !== "staff"
          ? "Podopiecznym"
          : ["staff_verification"],
      validated: false,
      redirect: false,
      fail_message: "",
      error_flag: false,
      incorrect_input: false,
      disabled: false,
    };
  }

  componentDidMount() {
    if (this.routerParam) {
      this.setState({ disabled: true });
      const getData = async (token, id) => {
        try {
          const res = await getUserData(token, id);
          console.log({ ...res });
          const {
            street_number,
            city,
            postal_code,
            street,
          } = res.facility_address;
          this.setState({
            homeData: {
              number: street_number,
              city,
              city_code: postal_code,
              street,
              name_of_place: res.facility_name,
            },
            personalData: {
              first_name: res.first_name,
              last_name: res.last_name,
              phone_number: res.phone_number,
            },
          });
        } catch (err) {}
        this.setState({ disabled: false });
      };
      getData(this.context.token, this.routerParam);
    }
  }

  sendFixedData = () => {};

  handleIncorrectResponse = (status) => {
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

    console.log(data);

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
          this.setRedirect();
        }
      } catch (error) {
        const msg = this.handleIncorrectResponse(error.status);
        this.setState({
          fail_message: msg,
          error_flag: true,
          disabled: false,
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
      disabled,
    } = this.state;
    const {
      renderSection,
      handleResponse,
      renderRedirect,
      routerParam,
      sendFixedData,
    } = this;

    return (
      <Container className="loginPage loginPage__register">
        <Card className="loginPage__card">
          <Card.Header as="h2" className="loginPage__header">
            {routerParam ? "Zmień dane użytkownika" : "Rejestracja"}
          </Card.Header>
          <Card.Body className="registerPage__body">
            {routerParam ? null : (
              <TypeSelection
                isAdmin={this.props.match.params.role === "staff"}
                selectType={this.selectType}
                cutType={this.cutType}
                current={this.state.account_type}
              />
            )}
            <Form
              noValidate
              validated={validated}
              onSubmit={
                routerParam ? sendFixedData() : (e) => handleResponse(e)
              }
              className="loginPage__form primary"
            >
              <section className="row">
                <PersonalDataForm
                  data={personalData}
                  onBlur={(personalData) => this.setState({ personalData })}
                />
                {renderSection()}
                {routerParam ? null : (
                  <AccountForm
                    data={accountData}
                    disabled={disabled}
                    onBlur={(accountData) => this.setState({ accountData })}
                  />
                )}
              </section>
              {routerParam ? (
                <Button
                  variant="primary"
                  className="loginPage__button"
                  type="submit"
                  data-testid="submitBtn"
                  disabled={disabled}
                >
                  {disabled ? "Ładowanie..." : "Popraw dane"}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="loginPage__button"
                  type="submit"
                  data-testid="submitBtn"
                  disabled={disabled}
                >
                  {disabled ? "Ładowanie..." : "Utwórz konto"}
                </Button>
              )}
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
            {routerParam ? null : this.props.match.params.role !== "staff" ? (
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

export default withRouter(RegisterPage);

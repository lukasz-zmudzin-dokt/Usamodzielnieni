import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import {
  HomeDataForm,
  PersonalDataForm,
  CompanyDataForm,
  AccountForm,
  TypeSelection,
} from "./components";
import { UserContext } from "context";
import { sendData } from "./functions/sendData";
import { withAlertContext } from "components";
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
      checked: false,
      passwordOK: true,
      redirect: false,
      disabled: false,
      regulations: false,
      role: null,
    };
  }

  handleSubmit = (data, event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const { password, passwordR } = data.accountData || {};
    this.setState({ passwordOk: true, checked: true });
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return false;
    } else if (password !== passwordR) {
      this.setState({ passwordOk: false });
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
      this.props.history.goBack();
    }
  };

  setRole = (e) => {
    this.setState({ role: e.target.value });
  };

  handleResponse = async (e) => {
    this.setState({ disabled: true });
    const data = {
      personalData: {
        ...this.state.personalData,
        phone_number:
          this.state.personalData?.phone_number &&
          "+48" + this.state.personalData.phone_number,
      },
      homeData: this.state.homeData,
      companyData: this.state.companyData,
      accountData: this.state.accountData,
      account_type: this.state.account_type,
      role: this.state.role,
      terms_accepted: this.state.regulations,
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
        this.props.alertContext.showAlert(Object.values(error)[0]);
      }
    }
    this.setState({ disabled: false });
  };

  regulationsCheck = (
    <p>
      Akceptuję <Link to="/regulations/policy">regulamin aplikacji</Link> oraz
      <Link to="/regulations/privacy_and_cookies">
        {" "}
        politykę prywatności i cookies
      </Link>
    </p>
  );

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
              setRole={this.setRole}
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
                  isAdmin={this.props.match.params.role === "staff"}
                  passwordOk={this.state.passwordOk}
                  checked={this.state.checked}
                />
              </section>
              <Form.Group controlId="formRegulationsCheck">
                <Form.Check
                  type="checkbox"
                  checked={this.state.regulations}
                  onClick={() =>
                    this.setState((prevState) => ({
                      regulations: !prevState.regulations,
                    }))
                  }
                  label={this.regulationsCheck}
                  required
                  feedback="Musisz zaakceptować regulamin"
                />
              </Form.Group>

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
            <small className="text-muted">
              Administratorem danych osobowych jest Fundacja One Day z siedzibą
              w Warszawie. Twoje dane będą przetwarzane m.in. w celach
              świadczenia Ci usług. Możesz skorzystać ze swoich praw takich jak
              m.in. prawo do dostępu i sprostowania Twoich danych osobowych.
              Więcej informacji znajdziesz w{" "}
              <Link to="/regulations/privacy_and_cookies">
                Polityce Prywatności i Cookies
              </Link>
              .
            </small>
          </Card.Body>
        </Card>
        {renderRedirect(redirect)}
      </Container>
    );
  }
}

RegisterPage.contextType = UserContext;

export default withRouter(withAlertContext(RegisterPage));

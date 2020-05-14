import React from "react";
import { Container, Button, Card, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import { UserContext } from "context";
import { sendData } from "./functions/sendData";
import proxy from "config/api";
import { WithAlertContext } from "components";

class LoginPage extends React.Component {
  state = {
    credentials: null,
    redirect: false,
    validated: false,
    disabled: false,
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/user" />;
    }
  };

  handleIncorrectResponse = (status) => {
    status === 400
      ? this.props.alertContext.showAlert("Niepoprawny login lub hasło.")
      : this.props.alertContext.showAlert(
          "Błąd serwera. Proszę spróbować później."
        );
    this.setState({
      redirect: false,
    });
  };

  handleSubmit = async (event) => {
    this.setState({ disabled: true });
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.setState({
        validated: true,
      });

      try {
        const response = await sendData(this.state.credentials);
        const { status } = response;
        if (status === 201) {
          const { token, type } = response; //do poprawy
          fetch(proxy.account + "data/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + token,
            },
          }).then((dataRes) => {
            if (dataRes.status === 200) {
              dataRes.json().then((dataValue) => {
                const { data } = dataValue;
                this.context.login(token, type, data);
                this.setRedirect();
              });
            } else {
              this.setState({
                validated: false,
              });
              this.props.alertContext.showAlert("Coś poszło nie tak");
            }
          });
        }
      } catch (response) {
        this.handleIncorrectResponse(response.status);
      }
    }
    this.setState({ disabled: false });
  };

  render() {
    const { validated, disabled } = this.state;
    const { renderRedirect, handleSubmit } = this;

    return (
      <Container className="loginPage">
        <Card className="loginPage__card loginPage__card--login">
          <Card.Header as="h2" className="loginPage__header">
            Logowanie
          </Card.Header>
          <Card.Body className="loginPage__body">
            <Form
              noValidate
              validated={validated}
              onSubmit={(e) => handleSubmit(e)}
            >
              <LoginForm
                data-testId="loginForm"
                data={this.state.credentials}
                onBlur={(credentials) => this.setState({ credentials })}
              />
              <Button
                data-testid="loginBtn"
                variant="primary"
                className="loginPage__button"
                type="submit"
                disabled={disabled}
              >
                {disabled ? "Ładowanie..." : "Zaloguj"}
              </Button>
            </Form>
            <div className="loginPage__links">
              <Link to="/newAccount">Załóż konto!</Link>
              {renderRedirect()}
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

LoginPage.contextType = UserContext;

export default WithAlertContext(LoginPage);

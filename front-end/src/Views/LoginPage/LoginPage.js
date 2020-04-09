import React from "react";
import { Container, Button, Card, Form, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import { UserContext } from "context";

import "Views/LoginPage/style.css";
import { sendData } from "./functions/sendData";

class LoginPage extends React.Component {
  state = {
    credentials: null,
    message: "",
    redirect: false,
    incorrect: false,
    validated: false,
    disabled: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/user" />;
    }
  };

  handleIncorrectResponse = status => {
    const msg =
      status === 400
        ? "Niepoprawny login lub hasło."
        : "Błąd serwera. Proszę spróbować później.";
    this.setState({
      message: msg,
      incorrect: true,
      redirect: false
    });
  };

  handleSubmit = async event => {
    this.setState({ disabled: true });
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.setState({
        validated: true
      });

      try {
        const response = await sendData(this.state.credentials);
        const { status } = response;
        if (status === 201) {
          const { token, type } = response;
          this.context.login(token, type);
          this.setRedirect();
        }
      } catch (response) {
        this.handleIncorrectResponse(response.status);
      }
    }
    this.setState({ disabled: false });
  };

  render() {
    const { validated, incorrect, message, disabled } = this.state;
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
              onSubmit={e => handleSubmit(e)}
            >
              <LoginForm
                data-testId="loginForm"
                data={this.state.credentials}
                onBlur={credentials => this.setState({ credentials })}
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
            {incorrect ? (
              <Alert variant="danger" className="loginPage__failure">
                {message}
              </Alert>
            ) : null}
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

export default LoginPage;

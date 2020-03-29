import React from "react";
import {Container, Button, Card, Form, Alert} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import LoginForm from "./components/loginForm";
import { UserContext } from "context";

import "Views/LoginPage/style.css";
import bgImage from "assets/fot..png";
import {sendData} from "./functions/sendData";

class LoginPage extends React.Component {
  state = {
    credentials: null,
    message: "",
    redirect: false,
    incorrect: false,
    cookieVal: false,
    validated: false
  };

  componentDidMount() {
    if (this.context.token) {
      this.setRedirect();
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/user" />;
    }
  };

  handleCheck = (e) => {
    this.setState({
      cookieVal: e.target.checked
    });
  };

  handleIncorrectResponse = (status) => {
    const msg = status === 400 ? "Niepoprawny login lub hasło" : "Błąd serwera. Proszę spróbować później";
    this.setState({
      message: msg,
      incorrect: true,
      redirect: false
    });
  };

  handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.setState({
        validated: true
      });
      event.preventDefault();
      sendData(this.state.credentials, event).then(response => {
        //response === undefined
        console.log(response);
        const {status} = response;
        console.log(status);
        if (status === 201) {
          const {token, type} = response;
          this.context.login(token, type);
          this.setRedirect();
        } else {
          this.handleIncorrectResponse(status);
        }
      });
    }
  };

  render() {
    const {validated, cookieVal, incorrect, message} = this.state;
    const {renderRedirect, handleCheck, handleSubmit} = this;

    return (
      <Container className="loginPage">
        {window.innerWidth >= 768 ? (
          <img className="loginPage__bgImage" src={bgImage} alt="tło" />
        ) : null}
        <Card className="loginPage__card loginPage__card--login">
          <Card.Header as="h2" className="loginPage__header">
            Logowanie
          </Card.Header>
          <Card.Body className="loginPage__body">
            <Form
              noValidate
              validated={validated}
              onSubmit={e => handleSubmit(e)}
              className="primary"
            >
              <LoginForm
                  data={this.state.credentials}
                  onBlur={credentials => this.setState({credentials})}
              />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  checked={cookieVal}
                  onChange={e => handleCheck(e)}
                  label="Zapamiętaj mnie"
                />
              </Form.Group>
              <Button
                data-testid="loginBtn"
                variant="secondary"
                className="loginPage__button"
                type="submit"
              >
                Zaloguj
                </Button>
            </Form>
            {incorrect ? (
              <div className="loginPage__messageFail">
                <Alert variant="danger" className="loginPage__failure">{message}</Alert>
              </div>
            ) : null}
            {console.log(this.state)}
            <div className="loginPage__links">
              <Link to="/newAccount">Załóż konto!</Link>
              {renderRedirect(this.state.redirect)}
              {/* <Link to="/newPassword">Zapomniałeś hasła?</Link> */}
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

LoginPage.contextType = UserContext;

export default LoginPage;

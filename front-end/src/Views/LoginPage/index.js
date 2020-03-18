import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { handleCheck } from "./functions/handlers";
import { handleSubmit } from "./functions/handlers";
import { renderRedirect } from "./functions/handlers";
import LoginForm from "./components/loginForm";
import { createMessage } from "./functions/createMessage";
import { sendData } from "./functions/sendData";
import { onChange } from "./functions/handlers";
import { setRedirect } from "./functions/handlers";
import { setCookie } from "./functions/handlers";
import { UserContext } from "context";

import "Views/LoginPage/style.css";
import bgImage from "../../assets/fot..png";


class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
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

  render() {
    const {
      username,
      password,
      validated,
      cookieVal,
      incorrect,
      message
    } = this.state;

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
              onSubmit={e => handleSubmit(this, e)}
              className="primary"
            >
              <LoginForm />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  checked={cookieVal}
                  onChange={e => handleCheck(this, e)}
                  label="Zapamiętaj mnie"
                />
              </Form.Group>
              <Button
                variant="secondary"
                className="loginPage__button"
                type="submit"
              >
                Zaloguj
                </Button>
            </Form>
            {incorrect ? (
              <div className="loginPage__messageFail">
                <small className="loginPage__failure">{message}</small>
              </div>
            ) : null}
            <div className="loginPage__links">
              <Link to="/newAccount">Załóż konto!</Link>
              {renderRedirect(this)}
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

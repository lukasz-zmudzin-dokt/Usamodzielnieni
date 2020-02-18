import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import Cookies from "universal-cookie";
import Form from "react-bootstrap/Form";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUserToken } from "redux/actions";
import { createMessage } from "./functions/createMessage";
import { sendData } from "./functions/sendData";
import { onChange } from "./functions/handlers";
import { setRedirect } from "./functions/handlers";
import { setCookie } from "./functions/handlers";
import { handleCheck } from "./functions/handlers";
import { handleSubmit } from "./functions/handlers";
import { renderRedirect } from "./functions/handlers";

import "Views/LoginPage/style.css";
import bgImage from "../../assets/fot..png";

const cookies = new Cookies();

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    message: "",
    redirect: false,
    incorrect: false,
    cookieVal: false,
    validated: false,
    token: this.props.token || ""
  };

  componentDidMount() {
    if (cookies.get("token")) {
      this.setRedirect();
    }
  };

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
              <Form.Group controlId="formGroupUsername">
                <Form.Control
                  type="text"
                  placeholder="Login"
                  required
                  value={username}
                  onChange={e => onChange(this, e)}
                  className="loginPage__input"
                  minLength="6"
                />
                <Form.Control.Feedback type="invalid">
                  Podaj właściwy login
    </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Control
                  type="password"
                  autoComplete="on"
                  placeholder="Hasło"
                  value={password}
                  onChange={e => onChange(this, e)}
                  required
                  minLength="6"
                />
                <Form.Control.Feedback type="invalid">
                  Podaj właściwe hasło
    </Form.Control.Feedback>
              </Form.Group>
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

export default connect(null, { setUserToken })(LoginPage);

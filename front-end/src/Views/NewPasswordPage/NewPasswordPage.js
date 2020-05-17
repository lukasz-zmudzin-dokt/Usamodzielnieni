import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { handlePasswordChange } from "./functions/submitActions";
import { Redirect, withRouter } from "react-router-dom";
import "Views/PasswordResetPrompt/style.css";
import { WithAlertContext } from "components";

class NewPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      password: "",
      passwordR: "",
      validated: false,
      redirect: false,
      disabled: false,
    };
  }

  componentDidMount() {
    const token = this.props.match.params.id;
    this.setState({
      token: token,
    });
  }

  setDelayedRedirect = () => {
    setTimeout(() => {
      this.setState({
        redirect: true,
      });
    }, 3000);
  };

  handleBlur = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect === true) return <Redirect to="/login" />;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { token, password, passwordR } = this.state;
    const form = e.currentTarget;
    this.setState({
      disabled: true,
    });
    if (form.checkValidity() === false || password !== passwordR) {
      this.props.alertContext.showAlert("Hasła się nie zgadzają");
      this.setState({
        disabled: false,
      });
    } else {
      const data = {
        token: token,
        password: password,
      };
      try {
        await handlePasswordChange(data);

        this.props.alertContext.showAlert(
          "Hasło zostało zmienione. Przekierowuję..."
        );
        this.setDelayedRedirect();
      } catch (e) {
        console.log(e);
        this.props.alertContext.showAlert(
          "Coś poszło nie tak. Upewnij się, że Twój token nie wygasł."
        );
      } finally {
        this.setState({
          validated: true,
          disabled: false,
        });
      }
    }
  };

  render() {
    const { password, passwordR, validated, disabled } = this.state;
    const { handleBlur, handleSubmit, renderRedirect } = this;
    return (
      <Container className="loginPage">
        <Card className="loginPage__card loginPage__card--login">
          <Card.Header as="h2" className="loginPage__header">
            Zmiana hasła
          </Card.Header>
          <Card.Body className="loginPage__body">
            <Form validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="newPassword">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Nowe hasło"
                  required
                  value={password}
                  onChange={handleBlur}
                  minLength="8"
                />
              </Form.Group>
              <Form.Group controlId="newPasswordRepeat">
                <Form.Control
                  name="passwordR"
                  type="password"
                  placeholder="Powtórz hasło"
                  required
                  value={passwordR}
                  onChange={handleBlur}
                  minLength="8"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="loginPage__button"
                disabled={disabled}
                type="submit"
              >
                {disabled ? "Ładowanie..." : "Wyślij"}
              </Button>
            </Form>
            {renderRedirect()}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default withRouter(WithAlertContext(NewPasswordPage));

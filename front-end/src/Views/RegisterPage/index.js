import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import bgImage from "../../assets/fot..png";
import { connect } from "react-redux";
import { setUserToken } from "redux/actions";
import PersonalDataForm from "./components/personalDataForm";
import HomeDataForm from "./components/homeDataForm";
import AccountForm from "./components/accountForm";
import {handleSubmit} from "./functions/submitForm";
import {renderRedirect} from "./functions/handlers";

const cookies = new Cookies();

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      username: "",
      phone_number: "",
      name_of_place: "",
      street: "",
      city: "",
      city_code: "",
      password: "",
      passwordR: "",
      areEqual: true,
      validated: false,
      redirect: false
    };
  }

  render() {
    const {
      validated,
      incorrect,
      message,
      correct,
    } = this.state;
    const { handleSubmit } = this;
    return (
      <Container className="loginPage loginPage__register">
        {window.innerWidth >= 768 ? (
          <img className="loginPage__bgImage" src={bgImage} alt="Tło" />
        ) : null}
        <Card className="loginPage__card">
          <Card.Header as="h2" className="loginPage__header">
            Rejestracja
          </Card.Header>
          <Card.Body className="loginPage__body">
            <Form
              noValidate
              validated={validated}
              onSubmit={e => handleSubmit(this, e)}
              className="loginPage__form primary"
            >
              <section className="row">
                <PersonalDataForm/>
                <HomeDataForm/>
                <AccountForm/>
              </section>
              <Button
                variant="secondary"
                className="loginPage__button"
                type="submit"
              >
                Utwórz konto
              </Button>
            </Form>
            {incorrect ? (
              <div className="loginPage__messageFail">
                <small className="loginPage__failure">{message}</small>
              </div>
            ) : null}
            {correct ? (
              <div className="loginPage__messageFail">
                <small className="loginPage__correct">{message}</small>
              </div>
            ) : null}
            <div className="loginPage__links">
              <Link to="/login" className="loginPage__link">
                Masz już konto? Zaloguj się!
              </Link>
            </div>
          </Card.Body>
        </Card>
        {renderRedirect(this)}
      </Container>
    );
  }
}
                
export default connect(null, { setUserToken })(RegisterPage);

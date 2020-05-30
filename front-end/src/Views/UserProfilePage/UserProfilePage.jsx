import React from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { UserContext } from "context";
import { getUserData } from "Views/UserProfilePage/functions/getUserData.js";
import UserBasicInfo from "./components/UserBasicInfo";
import {
  UserDetails,
  ButtonsContainer,
  NotificationsCheckbox,
} from "./components";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";

const names = {
  role: {
    admin: "Administrator",
    employer: "Pracodawca",
    common: "Podopieczny",
  },
  property: {
    username: "Nazwa użytkownika",
    role: "Rola",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "E-mail",
    phoneNumber: "Numer telefonu",
    chat_role: "Rola na czacie",
  },
};

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        role: "",
        firstName: "",
        lastName: "",
        email: "",
        chat_role: null,
      },
      is_subscribed: null,
      error: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await getUserData(this.context.token, this);
      this.setState({
        user: {
          username: res.data.username,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email,
          role: res.type,
          chat_role: res.data.role,
        },
        is_subscribed: res.data.is_subscribed,
      });
    } catch (res) {
      this.setState({ error: true });
    }
  };

  setMessage = () => {
    return (
      this.state.error && (
        <Alert variant="danger">Wystąpił błąd podczas pobierania</Alert>
      )
    );
  };

  render() {
    return (
      <Container>
        <Card className="user_profile_card">
          <Card.Header className="user_card_title">
            <h3>Mój profil</h3>
          </Card.Header>
          <Card.Body>
            <UserBasicInfo
              error={this.state.error}
              user={this.state.user}
              names={names}
            />
          </Card.Body>
          <UserDetails user={this.state.user} names={names} />
          {this.state.is_subscribed !== null ? (
            <Card.Body>
              <NotificationsCheckbox
                token={this.context.token}
                is_subscribed={this.state.is_subscribed}
              />
            </Card.Body>
          ) : null}
          <Card.Body className="text-center">
            {this.setMessage()}
            {this.context.type !== userTypes.STAFF &&
            this.context.data &&
            this.context.data.status !== userStatuses.VERIFIED ? (
              <Alert variant="info">
                Nie masz jeszcze dostępu do wszystkich funkcji aplikacji.
                Poczekaj na weryfikację swojego konta.
              </Alert>
            ) : null}
            <ButtonsContainer user={this.context} />
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

UserProfilePage.contextType = UserContext;

export default UserProfilePage;

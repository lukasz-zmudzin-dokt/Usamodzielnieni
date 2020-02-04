import React from "react";
import { Card, Container } from "react-bootstrap";
import "./style.css";
import UserDetails from "Views/UserProfilePage/components/UserDetails";
import UserBasicInfo from "Views/UserProfilePage/components/UserBasicInfo";

const names = {
  role: {
    admin: "Administrator",
    employer: "Pracodawca",
    common: "Podopieczny"
  },
  property: {
    username: "Nazwa użytkownika",
    role: "Rola",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "E-mail",
    phoneNumber: "Numer telefonu"
  }
};

class UserProfilePage extends React.Component {
  state = {
    user: {
      username: "user1",
      role: "common",
      firstName: "Jan",
      lastName: "Kowalski",
      email: "jan.kowalski@pw.edu.pl",
      phoneNumber: "+48123456789"
    }
  };

  render() {
    return (
      <Container>
        <Card className="user_profile_card">
          <Card.Header className="user_card_title">
            <h3>Mój profil</h3>
          </Card.Header>
          <Card.Body>
            <UserBasicInfo user={this.state.user} names={names} />
          </Card.Body>
          <UserDetails user={this.state.user} names={names} />
        </Card>
      </Container>
    );
  }
}

export default UserProfilePage;

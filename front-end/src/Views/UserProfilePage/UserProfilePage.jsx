import React from "react";
import {Button, Card, Container} from "react-bootstrap";
import UserDetails from "Views/UserProfilePage/components/UserDetails";
import UserBasicInfo from "Views/UserProfilePage/components/UserBasicInfo";
import { UserContext } from "context";
import { getUserData } from "Views/UserProfilePage/functions/getUserData.js";
import { LinkContainer } from 'react-router-bootstrap';

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

  async componentDidMount() {
    await getUserData(this.context.token, this).then(async response => {
      if (response.status === 200) {
        const res = await response.json();
        this.setState({
          user: {
            username: res.data.username,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email,
            phoneNumber: res.data.phone_number
          }
        });
      } else {
        throw response.status;
      }
    });
  }

  renderRegister = () => {
    return (
        <LinkContainer to="/staff/register">
          <Button className="mt-3" variant="success" block>
            Zarejestruj administratora
          </Button>
        </LinkContainer>
    )
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
        {this.context.type === 'Staff' ? this.renderRegister() : null}
      </Container>
    );
  }
}

UserProfilePage.contextType = UserContext;

export default UserProfilePage;
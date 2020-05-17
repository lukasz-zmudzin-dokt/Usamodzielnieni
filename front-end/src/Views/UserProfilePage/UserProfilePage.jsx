import React from "react";
import { Alert, Card, Container } from "react-bootstrap";
import UserDetails from "Views/UserProfilePage/components/UserDetails";
import UserBasicInfo from "Views/UserProfilePage/components/UserBasicInfo";
import { UserContext } from "context";
import { getUserData } from "Views/UserProfilePage/functions/getUserData.js";
import AdminRegisterButton from "./components/AdminRegisterButton/AdminRegisterButton";
import CVApprovalButton from "./components/CVApprovalButton/CVApprovalButton";
import EmployerMyOffersButton from "./components/EmployerMyOffersButton/EmployerMyOffersButton";
import AdminApproveUserButton from "./components/AdminApproveUserBuuton/AdminApproveUserButton";
import { WithAlertContext } from "components";
import UserListButton from "./components/UserListButton/UserListButton";
import AdminOfferApprovalButton from "./components/AdminOfferApprovalButton/AdminOfferApprovalButton";
import {userTypes} from "constants/userTypes";
import {userStatuses} from "constants/userStatuses";

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
  },
};

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "...",
        role: "...",
        firstName: "...",
        lastName: "...",
        email: "...",
        err: false,
      },
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
        },
      });
    } catch (res) {
      this.setState({ err: true });
    }
  };

  setMessage = () => {
    return (
      this.state.err && (
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
            <UserBasicInfo user={this.state.user} names={names} />
          </Card.Body>
          <UserDetails user={this.state.user} names={names} />
          <Card.Body className="text-center">
            {this.setMessage()}
            <CVApprovalButton user={this.context} />
            <EmployerMyOffersButton user={this.context} />
            <AdminRegisterButton user={this.context} />
            <AdminApproveUserButton user={this.context} />
            <AdminOfferApprovalButton user={this.context} />
            {this.context.type !== userTypes.STAFF && this.context.data && this.context.data.status !== userStatuses.VERIFIED ?
              <Alert variant="info">Nie masz jeszcze dostępu do wszystkich funkcji aplikacji. Poczekaj na weryfikację swojego konta.</Alert> :
                null
            }
            <UserListButton user={this.context} />
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

UserProfilePage.contextType = UserContext;

export default WithAlertContext(UserProfilePage);

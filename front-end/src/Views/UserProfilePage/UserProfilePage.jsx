import React from "react";
import {Card, Container} from "react-bootstrap";
import UserDetails from "Views/UserProfilePage/components/UserDetails";
import UserBasicInfo from "Views/UserProfilePage/components/UserBasicInfo";
import { UserContext } from "context";
import { getUserData } from "Views/UserProfilePage/functions/getUserData.js";
import AdminRegisterButton from "./components/AdminRegisterButton/AdminRegisterButton";
import CVApprovalButton from "./components/CVApprovalButton/CVApprovalButton";

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
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        role: "",
        firstName: "",
        lastName: "",
        email: ""
      },
      error: false
    };
  }

  componentDidMount() {
    this.getData();
  };

  getData = async () => {
    try {
      const res = await getUserData(this.context.token, this);
      this.setState({
        user: {
          username: res.data.username,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email,
          role: res.type
        }
      });
    } catch (res) {
      this.setState({error: true})
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
            <UserBasicInfo error={this.state.error} user={this.state.user} names={names} />
          </Card.Body>
          <UserDetails user={this.state.user} names={names} />
          <Card.Body className="text-center">
            <AdminRegisterButton userType={this.context} />
            <CVApprovalButton userType={this.context} />
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

UserProfilePage.contextType = UserContext;

export default UserProfilePage;
import React from "react";
import { Card, Container } from "react-bootstrap";
import "./style.css";
import UserDetails from "Views/UserProfilePage/components/UserDetails";
import UserBasicInfo from "Views/UserProfilePage/components/UserBasicInfo";
import Cookies from "universal-cookie";
import { getCvUrl } from "Views/UserProfilePage/functions/getCvUrl";
import { getCvData } from "Views/UserProfilePage/functions/getCvData";


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


    const cookies = new Cookies();
    const url = "http://usamo-back.herokuapp.com/account/data";
    const token = await cookies.get("token");
    console.log(token);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
      }
    }).then(response => {
     // if (!response.ok) throw new Error(response.status);
      return response;
    });
    const data = await response.json();
    console.log(data);
    console.log(data.data);
    console.log(data.data.first_name);
    this.setState({
      user: {
        username: data.data.username,
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        email: data.data.email,
        phoneNumber: data.data.phone_number
      }
    });
    const cvurl = await getCvUrl();
    const cvdata = await getCvData();
    console.log(cvurl);
    console.log(cvdata);
  }

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

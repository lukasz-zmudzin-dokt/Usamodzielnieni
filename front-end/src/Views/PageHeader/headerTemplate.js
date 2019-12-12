import React from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";

import "Views/PageHeader/headerLayout.css";
import logo from "assets/logo.png";

// https://github.com/ReactTraining/react-router/issues/83#issuecomment-214794477
import {IndexLinkContainer} from 'react-router-bootstrap';
import {Redirect} from "react-router-dom";
import {setUserToken} from "../../redux/actions";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class HeaderTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: window.location.pathname,
      token: cookies.get("token") || ""
    };
  }

    displayMenu() {
      console.log(this.state.token);
      console.log(this.state.currentLocation);
      console.log(this.props);
    if (this.state.currentLocation !== "/")
      return (
        <Nav className="mr-auto ">
          <IndexLinkContainer to="/cvEditor">
            <Nav.Link id="cvEditor">
              Kreator CV
            </Nav.Link>
          </IndexLinkContainer>
          <Nav.Link id="learningTheRopes">Od czego zacząć?</Nav.Link>
          <Nav.Link id="jobOffers">Oferty pracy</Nav.Link>
          <Nav.Link id="jobDescriptions">Opis stanowisk</Nav.Link>
          <Nav.Link id="personalityTests">Testy</Nav.Link>
          <Nav.Link id="stories">Historie usamodzielnionych</Nav.Link>
          <Nav.Link id="moneyMgmt">Zarządzanie budżetem</Nav.Link>
          <Nav.Link id="contactPhones">Telefony</Nav.Link>
        </Nav>
      );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.state !== prevState) {
          this.forceUpdate();
      }
  }

    displayButtonSet() {
    if (this.state.token !== "")
      return (
        <Form inline>
            <IndexLinkContainer to="/user">
              <Button id="userProfile" variant="light">
                Profil
              </Button>
            </IndexLinkContainer>
            <IndexLinkContainer to="/">
              <Button id="loginButton" variant="outline-light" onClick={e => this.userLogout(e)}>
                Wyloguj
              </Button>
            </IndexLinkContainer>
        </Form>
      );
    else
      return (
        <Form inline pull-right>
            <IndexLinkContainer to="/newAccount">
          <Button id="userProfile" variant="light">
            Rejestracja
          </Button>
            </IndexLinkContainer>
            <IndexLinkContainer to="/login">
              <Button id="loginButton" variant="outline-light">
                Logowanie
              </Button>
            </IndexLinkContainer>
        </Form>
      );
  }

  sendLogoutRequest() {
      const token = this.state.token;
      console.log(token);
      const url = "https://usamo-back.herokuapp.com/account/logout/";
      fetch(url, {
          method: "POST",
          headers: {
              "Authorization": token
          },
          body: {}
      }).then(res => {
          console.log(res);
          if (res.status === 200) {
              console.log("Wylogowano");
          }
      });
  }

  userLogout = e => {
      this.sendLogoutRequest();
    this.setState({
        token: ""
    });
    setUserToken("");
    e.preventDefault();
    cookies.remove("token", {path: "/"});
    return (
        <Redirect to="/"/>
        );
  };

  render() {
    return (
      <Navbar id="navbar_menu" variant="dark" fixed="top" expand="lg">
        <Navbar.Brand id="navbar_logo">
          <IndexLinkContainer to="/">
            <img
              className="charity_logo"
              width="200vh"
              src={logo}
              alt="Usamodzielnieni"
            />
          </IndexLinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topMenu" />
        <Navbar.Collapse id="topMenu">
          <div id="menuOptions">{this.displayMenu()}</div>
        </Navbar.Collapse>
        <div id="nav_buttons">{this.displayButtonSet()}</div>
      </Navbar>
    );
  }
}

export default HeaderTemplate;

import React from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";

import "Views/PageHeader/headerLayout.css";
import logo from "assets/logo.png";

// https://github.com/ReactTraining/react-router/issues/83#issuecomment-214794477
import { LinkContainer } from 'react-router-bootstrap';

class HeaderTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: window.location.pathname,
      isLoggedIn: this.props.isLoggedIn //status pobierany jakimś getem do api?
    };
  }

  displayMenu() {
    if (this.state.currentLocation !== "/")
      return (
        <Nav pullCenter className="mr-auto ">
          <LinkContainer to="/cvEditor">
            <Nav.Link id="cvEditor">
              Kreator CV
            </Nav.Link>
          </LinkContainer>
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

  displayButtonSet() {
    if (this.state.isLoggedIn)
      return (
        <Form inline pull-right>
          <Button id="userProfile" variant="light" href="/user">
            Profil
          </Button>
          <Button
            id="loginButton"
            variant="outline-light"
            onClick={e => this.userLogout(e)}
          >
            Wyloguj
          </Button>
        </Form>
      );
    else
      return (
        <Form inline pull-right>
          <Button id="userProfile" variant="light" href="/newAccount">
            Rejestracja
          </Button>
          <Button id="loginButton" variant="outline-light" href="/login">
            Logowanie
          </Button>
        </Form>
      );
  }

  userLogout = e => {
    this.setState({
      isLoggedIn: false
    });
    e.preventDefault();
    window.location.replace("/");
  };

  render() {
    return (
      <Navbar id="navbar_menu" variant="dark" fixed="top" expand="lg">
        <Navbar.Brand id="navbar_logo">
          <a href="/">
            <img
              id="charity_logo"
              width="200vh"
              src={logo}
              alt="Usamodzielnieni"
            />
          </a>
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

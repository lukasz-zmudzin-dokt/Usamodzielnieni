import React from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";

import "Views/PageHeader/headerLayout.css";
import logo from "assets/logo.png";

// https://github.com/ReactTraining/react-router/issues/83#issuecomment-214794477
import {IndexLinkContainer} from 'react-router-bootstrap';
import {Redirect, withRouter} from "react-router-dom";
import {setUserToken} from "../../redux/actions";
import Cookies from "universal-cookie";
import {connect} from "react-redux";
const cookies = new Cookies();

class HeaderTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token || undefined
        }
    }

  displayMenu() {
    if (this.props.location.pathname !== "/")
      return (
        <Nav className="mr-auto ">
          <IndexLinkContainer to={this.props.token === undefined ? "/login" : "/cvEditor"}>
            <Nav.Link id="cvEditor">
              Kreator CV
            </Nav.Link>
          </IndexLinkContainer>
          <Nav.Link id="learningTheRopes">Jak zacząć?</Nav.Link>
          <Nav.Link id="jobOffers">Oferty pracy</Nav.Link>
          {/* <Nav.Link id="jobDescriptions">Opis stanowisk</Nav.Link> */}
          {/* <Nav.Link id="personalityTests">Testy</Nav.Link> */}
          <Nav.Link id="stories">Historia</Nav.Link>
          {/* <Nav.Link id="moneyMgmt">Zarządzanie budżetem</Nav.Link> */}
          <Nav.Link id="contactPhones">Telefony</Nav.Link>
        </Nav>
      );
  }

  displayButtonSet() {
      console.log(this.props.token);
    if (this.props.token !== undefined)
      return (
        <Form inline pull-right className="action_buttons">
            <IndexLinkContainer to="/user">
              <Button className="menu_action_button_1" variant="light">
                Profil
              </Button>
            </IndexLinkContainer>
            <IndexLinkContainer to="/">
              <Button className="menu_action_button_2" variant="outline-light" onClick={e => this.userLogout(e)}>
                Wyloguj
              </Button>
            </IndexLinkContainer>
        </Form>
      );
    else
      return (
        <Form inline pull-right className="action_buttons">
            <IndexLinkContainer to="/login">
              <Button className="menu_action_button_3" variant="outline-light">
                Logowanie
              </Button>
            </IndexLinkContainer>
        </Form>
      );
  }

    userLogout = e => {
      const token = cookies.get("token");
      console.log(token);
      const url = "https://usamo-back.herokuapp.com/account/logout/";
      fetch(url, {
          method: "POST",
          headers: {
              "Authorization": "token " + token
          },
          body: {}
      }).then(res => {
          console.log(res);
          if (res.status === 200) {
              res.json().then(responseValue => {
                  console.log(responseValue);
                  console.log("Wylogowano");
                  this.props.setUserToken(undefined);
                  cookies.remove("token", {path: "/"});
                  return (
                      <Redirect to="/"/>
                  );
              });
          }
      });
  };

  render() {
      const { match, location, history } = this.props;
      console.log(match, location, history, this.props);
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

const mapStateToProps = (state) => {
    console.log("mapStateToProps:", state);
    const { token } = state.user;
    return { token };
};

export default connect(mapStateToProps, {setUserToken})(withRouter(HeaderTemplate));

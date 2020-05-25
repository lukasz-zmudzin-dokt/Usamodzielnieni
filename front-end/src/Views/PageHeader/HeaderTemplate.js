import React from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { compile } from "path-to-regexp";
import logo from "assets/logo.png";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Redirect, withRouter } from "react-router-dom";
import { UserContext } from "context";
import Notifications from "./components/Notifications";
import menuPositions from "constants/menuPositions";
import { userTypes } from "constants/userTypes";
import proxy from "config/api";
import { userStatuses } from "constants/userStatuses";

class HeaderTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      slide: 0,
      lastScrollY: 0,
    };
  }

  handleScroll = () => {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      this.setState({ slide: "-100px" });
    } else {
      this.setState({ slide: "0px" });
    }
    this.setState({ lastScrollY: currentScrollY });
  };

  displayMenu() {
    let type = this.context.token ? this.context.type : undefined;
    let adminGroup =
      this.context.data && type === userTypes.STAFF
        ? this.context.data.group_type
        : undefined;
    let loggedOut, userIncluded, adminIncluded, userVerified;
    if (this.props.location.pathname !== "/")
      return (
        <Nav className="mr-auto ">
          {menuPositions.map((pos) => {
            const path = compile(pos.path);
            loggedOut = !this.context.token && !pos.allowed;
            userIncluded =
              !pos.allowed || pos.allowed.includes(this.context.type);
            adminIncluded =
              adminGroup &&
              (!pos.allowed ||
                pos.allowed.some((type) => adminGroup.includes(type)));
            userVerified =
              pos.verified === true &&
              this.context.data &&
              this.context.data.status === userStatuses.VERIFIED;
            return loggedOut ||
              (this.context.token &&
                userIncluded &&
                (!pos.verified || userVerified)) ||
              adminIncluded ? (
              <IndexLinkContainer to={path({})} key={pos.name}>
                <Nav.Link>{pos.name}</Nav.Link>
              </IndexLinkContainer>
            ) : null;
          })}
        </Nav>
      );
  }

  displayButtonSet() {
    if (this.context.token)
      return (
        <Form inline className="action_buttons">
          <Notifications
            location={this.props.location}
            token={this.context.token}
            className="menu_action_button_0"
          />
          <IndexLinkContainer to="/user">
            <Button className="menu_action_button_1" variant="light">
              Profil
            </Button>
          </IndexLinkContainer>
          <IndexLinkContainer to="/">
            <Button
              className="menu_action_button_2"
              variant="outline-light"
              onClick={(e) => this.userLogout(e)}
            >
              Wyloguj
            </Button>
          </IndexLinkContainer>
        </Form>
      );
    else
      return (
        <Form inline className="action_buttons">
          <IndexLinkContainer to="/login">
            <Button className="menu_action_button_3" variant="outline-light">
              Logowanie
            </Button>
          </IndexLinkContainer>
        </Form>
      );
  }

  userLogout = (e) => {
    const url = proxy.account + "logout/";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token " + this.context.token,
      },
      body: {},
    }).then((res) => {
      if (res.status === 200 || res.status === 401) {
        res.json().then((responseValue) => {
          this.context.logout();
          return <Redirect to="/" />;
        });
      }
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <Navbar
        id="navbar_menu"
        variant="dark"
        fixed="top"
        expand="xl"
        style={{
          transform: `translate(0, ${this.state.slide})`,
          transition: "transform 90ms linear",
        }}
      >
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

HeaderTemplate.contextType = UserContext;

export default withRouter(HeaderTemplate);

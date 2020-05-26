import React, { useContext, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { UserContext } from "context";
import { logoutUser } from "./apiCalls";
import "./style.css";
import { Redirect, useLocation } from "react-router-dom";
import logo from "assets/logo-white.png";
import menu from "assets/hamburger-menu-icon.svg";
import Alert from "react-bootstrap/Alert";
import Notifications from "./components/Notifications";
import { paths } from "constants/paths";
import { staffTypes } from "constants/staffTypes";

const Header = () => {
  const context = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser(context.token);
      setLogout(true);
      context.logout();
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };
  const leftNav = (
    <Nav className="mr-auto">
      <IndexLinkContainer to={paths.DASHBOARD}>
        <Nav.Link className="logo-button">
          <img src={logo} className="logo" alt={"logo"} />
        </Nav.Link>
      </IndexLinkContainer>
      <IndexLinkContainer to={paths.CONTACT_PAGE}>
        <Nav.Link className="navbar-left-button ">KONTAKT</Nav.Link>
      </IndexLinkContainer>
      <IndexLinkContainer to={paths.BLOG_PAGE}>
        <Nav.Link className="navbar-left-button ">BLOG</Nav.Link>
      </IndexLinkContainer>
      <IndexLinkContainer to={paths.JOB_OFFERS}>
        <Nav.Link className="navbar-left-button ">OFERTY PRACY</Nav.Link>
      </IndexLinkContainer>
    </Nav>
  );

  const staffNavs = [
    {
      id: 0,
      link: paths.REGISTER_ADMIN,
      name: "ZAREJESTRUJ ADMINISTRATORA",
      group_type: staffTypes.VERIFICATION,
    },
    {
      id: 1,
      link: paths.USER_APPROVAL,
      name: "AKCEPTUJ NOWYCH UŻYTKOWNIKÓW",
      group_type: staffTypes.VERIFICATION,
    },
    {
      id: 2,
      link: paths.CV_APPROVAL,
      name: "AKCEPTACJA CV",
      group_type: staffTypes.CV,
    },
    {
      id: 3,
      link: paths.OFFER_APPROVAL,
      name: "AKCEPTUJ OFERTY PRACY",
      group_type: staffTypes.JOBS,
    },
    {
      id: 4,
      link: paths.CHATS,
      name: "CZAT",
      group_type: staffTypes.CHAT,
    },
  ];

  const accountDropdownNav =
    context.type === "standard" ? (
      <IndexLinkContainer to={paths.MY_CVS}>
        <NavDropdown.Item className="account-dropdown-button white">
          MOJE CV
        </NavDropdown.Item>
      </IndexLinkContainer>
    ) : context.type === "employer" ? (
      <IndexLinkContainer to={paths.MY_OFFERS}>
        <NavDropdown.Item className="account-dropdown-button white">
          MOJE OFERTY
        </NavDropdown.Item>
      </IndexLinkContainer>
    ) : context.type === "staff" && context.data !== undefined ? (
      <>
        <IndexLinkContainer to={paths.USER_LIST}>
          <NavDropdown.Item className="account-dropdown-button white">
            LISTA UŻYTKOWNIKÓW
          </NavDropdown.Item>
        </IndexLinkContainer>
        {staffNavs.map((nav) => {
          if (context.data.group_type.includes(nav.group_type)) {
            return (
              <IndexLinkContainer to={nav.link} key={nav.id}>
                <NavDropdown.Item className="account-dropdown-button white">
                  {nav.name}
                </NavDropdown.Item>
              </IndexLinkContainer>
            );
          } else {
            return null;
          }
        })}
      </>
    ) : null;

  const rightNav =
    context.token === undefined ? (
      <Nav>
        <IndexLinkContainer to={paths.REGISTER}>
          <Nav.Link className="navbar-right-button register-color">
            REJESTRACJA
          </Nav.Link>
        </IndexLinkContainer>
        <IndexLinkContainer to={paths.LOGIN}>
          <Nav.Link className="navbar-right-button login-color">
            LOGOWANIE
          </Nav.Link>
        </IndexLinkContainer>
      </Nav>
    ) : (
      <Nav>
        <Notifications location={useLocation} token={context.token} />
        <NavDropdown
          id={"myAccDropdown"}
          title={
            <span className="white" onClick={isOpen ? handleClose : handleOpen}>
              MOJE KONTO
            </span>
          }
          className="navbar-right-button register-color"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          show={isOpen}
        >
          <IndexLinkContainer to={paths.USER}>
            <NavDropdown.Item className="account-dropdown-button account-dropdown-button-first white">
              MÓJ PROFIL
            </NavDropdown.Item>
          </IndexLinkContainer>
          {accountDropdownNav}
        </NavDropdown>
        <Nav.Link
          className="navbar-right-button login-color"
          onClick={handleLogout}
        >
          WYLOGUJ
        </Nav.Link>
      </Nav>
    );

  const errMsg = (
    <Alert variant="danger" className="w-100 mt-2">
      Wystąpił błąd.
    </Alert>
  );

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      className="font p-3 justify-content-end"
    >
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        bsPrefix="hamburger-toggle"
      >
        <p className="hamburger-menu-text">MENU</p>
        <img
          src={menu}
          id={"menu"}
          alt={"menu"}
          className="hamburger-menu-logo"
        />
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        {leftNav}
        {rightNav}
      </Navbar.Collapse>
      {logout ? <Redirect to={paths.DASHBOARD} /> : null}
      {error ? errMsg : null}
    </Navbar>
  );
};

export default Header;

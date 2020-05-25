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
import Notifications from "../PageHeader/components/Notifications";

const Header = () => {
  const context = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [logout, setLogout] = useState(false);
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };/*
  const handleOpenNotifications = () => {
    setIsOpenNotifications(true);
  };
  const handleCloseNotifications = () => {
    setIsOpenNotifications(false);
  };*/

  const handleLogout = async () => {
    try {
      await logoutUser(context.token);
      context.logout();
      setLogout(true);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };
  const leftNav = (
    <Nav className="mr-auto">
      <IndexLinkContainer to={"/"}>
        <Nav.Link className="logo-button">
          <img src={logo} className="logo" alt={"logo"} />
        </Nav.Link>
      </IndexLinkContainer>
      <IndexLinkContainer to={"/contact"}>
        <Nav.Link className="navbar-left-button ">KONTAKT</Nav.Link>
      </IndexLinkContainer>
      <IndexLinkContainer to={"/blog"}>
        <Nav.Link className="navbar-left-button ">BLOG</Nav.Link>
      </IndexLinkContainer>
      <IndexLinkContainer to={"/jobOffers"}>
        <Nav.Link className="navbar-left-button ">OFERTY PRACY</Nav.Link>
      </IndexLinkContainer>
    </Nav>
  );

  const staffNavs = [
    {
      id: 0,
      link: "/newAccount/staff",
      name: "ZAREJESTRUJ ADMINISTRATORA",
      group_type: "staff_verification",
    },
    {
      id: 1,
      link: "/userApproval",
      name: "AKCEPTUJ NOWYCH UŻYTKOWNIKÓW",
      group_type: "staff_verification",
    },
    {
      id: 2,
      link: "/cvApproval",
      name: "AKCEPTACJA CV",
      group_type: "staff_cv",
    },
    {
      id: 3,
      link: "/offerApproval",
      name: "AKCEPTUJ OFERTY PRACY",
      group_type: "staff_jobs",
    },
  ];
  console.log(context);

  const accountDropdownNav =
    context.type === "standard" ? (
      <IndexLinkContainer to={"/myCVs"}>
        <NavDropdown.Item className="account-dropdown-button white">
          MOJE CV
        </NavDropdown.Item>
      </IndexLinkContainer>
    ) : context.type === "employer" ? (
      <IndexLinkContainer to={"/myOffers"}>
        <NavDropdown.Item className="account-dropdown-button white">
          MOJE OFERTY
        </NavDropdown.Item>
      </IndexLinkContainer>
    ) : context.type === "staff" && context.data !== undefined ? (
      <>
        <IndexLinkContainer to={"/userList"}>
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
          }
        })}
      </>
    ) : null;

  const rightNav =
    context.token === undefined ? (
      <Nav>
        <IndexLinkContainer to={"/newAccount"}>
          <Nav.Link className="navbar-right-button register-color">
            REJESTRACJA
          </Nav.Link>
        </IndexLinkContainer>
        <IndexLinkContainer to={"/login"}>
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
          title={<span className="white">MOJE KONTO</span>}
          className="navbar-right-button register-color"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          show={isOpen}
        >
          <IndexLinkContainer to={"/user"}>
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
        <a className="hamburger-menu-text">MENU</a>
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
      {logout ? <Redirect to={"/"} /> : null}
      {error ? errMsg : null}
    </Navbar>
  );
};

export default Header;

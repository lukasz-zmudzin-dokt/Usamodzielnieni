import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { UserContext } from "context";
import { logoutUser } from "./apiCalls";
import { Redirect, useLocation } from "react-router-dom";
import logo from "assets/logo-white.png";
import menu from "assets/hamburger-menu-icon.svg";
import Alert from "react-bootstrap/Alert";
import Notifications from "./components/Notifications";
import { paths } from "constants/paths";
import { staffTypes } from "constants/staffTypes";
import { userTypes } from "constants/userTypes";

const Header = () => {
  const context = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollLocation, setScrollLocation] = useState(window.pageYOffset);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
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

  const handleExpand = () => {
    setExpanded(false);
  };

  const handleScroll = () => {
    if (scrollLocation >= window.pageYOffset) {
      setVisible(true);
    } else {
      setVisible(false);
      handleClose();
    }
    setScrollLocation(window.pageYOffset);
    handleExpand();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

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
      link: "/newAccount/staff",
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
    {
      id: 5,
      link: paths.CV_CREATOR,
      name: "KREATOR CV",
      group_type: staffTypes.BLOG_MODERATOR,
    },
    {
      id: 6,
      link: paths.CV_CREATOR,
      name: "KREATOR CV",
      group_type: staffTypes.GUEST,
    },
    {
      id: 7,
      link: "/offerForm",
      name: "DODAJ OFERTĘ",
      group_type: staffTypes.GUEST,
    },
  ];

  const accountDropdownNav =
    context.type === userTypes.STANDARD ? (
      <>
        <IndexLinkContainer to={paths.MY_CVS}>
          <NavDropdown.Item className="account-dropdown-button white">
            MOJE CV
          </NavDropdown.Item>
        </IndexLinkContainer>
        <IndexLinkContainer to={paths.CHATS}>
          <NavDropdown.Item className="account-dropdown-button white">
            CHAT
          </NavDropdown.Item>
        </IndexLinkContainer>
      </>
    ) : context.type === userTypes.EMPLOYER ? (
      <>
        <IndexLinkContainer to={paths.MY_OFFERS}>
          <NavDropdown.Item className="account-dropdown-button white">
            MOJE OFERTY
          </NavDropdown.Item>
        </IndexLinkContainer>
        <IndexLinkContainer to={paths.CHATS}>
          <NavDropdown.Item className="account-dropdown-button white">
            CHAT
          </NavDropdown.Item>
        </IndexLinkContainer>
      </>
    ) : context.type === userTypes.STAFF && context.data !== undefined ? (
      <>
        {!context.data.group_type.includes(staffTypes.GUEST) ? (
          <IndexLinkContainer to={paths.USER_LIST}>
            <NavDropdown.Item className="account-dropdown-button white">
              LISTA UŻYTKOWNIKÓW
            </NavDropdown.Item>
          </IndexLinkContainer>
        ) : null}
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
        <Notifications className="desktopNotifications" location={location} />
        <NavDropdown
          id={"myAccDropdown"}
          title={<span className="white">MOJE ZAKŁADKI</span>}
          className="navbar-right-button register-color"
          onClick={isOpen ? handleClose : handleOpen}
          show={isOpen}
        >
          <IndexLinkContainer to={paths.USER}>
            <NavDropdown.Item className="account-dropdown-button account-dropdown-button-first white">
              MÓJ PROFIL
            </NavDropdown.Item>
          </IndexLinkContainer>
          <IndexLinkContainer to={paths.STEPS}>
            <NavDropdown.Item className="account-dropdown-button white">
              KROKI USAMODZIELNIENIA
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
      expanded={expanded}
      onToggle={() => {
        setExpanded(!expanded);
      }}
      expand="lg"
      sticky="top"
      className={`font p-3 navbar ${visible ? "" : "navbar--hidden"}`}
    >
      {context.token === undefined ? (
        <div />
      ) : (
        <Notifications className="mobileNotifications" location={location} />
      )}
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

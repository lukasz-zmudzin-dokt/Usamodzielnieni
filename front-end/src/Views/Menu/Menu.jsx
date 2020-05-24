import React, { useContext } from "react";
import { Row, Col, Container, Button, ButtonToolbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "assets/logo.png";
import { Redirect } from "react-router-dom";
import { UserContext } from "context/UserContext";
import proxy from "config/api";
import { TilesContainer } from "./components";

const Menu = () => {
  const user = useContext(UserContext);

  const userLogout = (e) => {
    const url = proxy.account + "logout/";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token " + user.token,
      },
      body: {},
    }).then((res) => {
      if (res.status === 200 || res.status === 401) {
        res.json().then((responseValue) => {
          user.logout();
          return <Redirect to="/" />;
        });
      }
    });
  };

  const displayButtonToolbar = () => {
    if (user.token === undefined)
      return (
        <ButtonToolbar>
          <LinkContainer to="/newAccount">
            <Button className="menu-button-big">Utwórz konto</Button>
          </LinkContainer>
          <LinkContainer to="/login">
            <Button className="menu-button-big">Zaloguj się</Button>
          </LinkContainer>
        </ButtonToolbar>
      );
    else
      return (
        <ButtonToolbar>
          <LinkContainer to="/user">
            <Button className="menu-button-big">Profil</Button>
          </LinkContainer>
          <Button className="menu-button-big" onClick={userLogout}>
            Wyloguj się
          </Button>
        </ButtonToolbar>
      );
  };

  return (
    <Container className="Menu" fluid={true}>
      <div className="menu-background d-flex justify-content-center align-items-center">
        <Row>
          <Col />
          <Col xs={7}>
            <img src={logo} className="menu-logo" alt="Menu logo" />
          </Col>
          <Col />
        </Row>
        <Row className="menu-button-row">
          <Col />
          <Col>{displayButtonToolbar()}</Col>
          <Col />
        </Row>
        <Row className="menu-button-row">
          <Col />
          <Col>
            <ButtonToolbar>
              <LinkContainer to={!user.token ? "/login" : "/cvEditor"}>
                <Button className="menu-button-small menu-button-white">
                  Kreator CV
                </Button>
              </LinkContainer>
              <LinkContainer to={"/myCVs"}>
                <Button className="menu-button-small menu-button-white">
                  Moje CV
                </Button>
              </LinkContainer>
              <LinkContainer to={"/jobOffers"}>
                <Button className="menu-button-small menu-button-white">
                  Oferty pracy
                </Button>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Button className="menu-button-small menu-button-white">
                  Blogi
                </Button>
              </LinkContainer>
            </ButtonToolbar>
          </Col>
          <Col />
        </Row>
      </div>
      <Row>
        <TilesContainer />
      </Row>
    </Container>
  );
};

export default Menu;

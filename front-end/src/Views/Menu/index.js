import React from "react";
import { Row, Col, Container, Button, ButtonToolbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "assets/logo.png";
import { Redirect } from "react-router-dom";
import { UserContext } from "context/UserContext";

class Menu extends React.Component {
  userLogout = e => {
    const url = "https://usamo-back.herokuapp.com/account/logout/";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token " + this.context.token
      },
      body: {}
    }).then(res => {
      console.log(res);
      if (res.status === 200 || res.status === 401) {
        res.json().then(responseValue => {
          console.log(responseValue);
          console.log("Wylogowano");
          this.context.logout();
          return <Redirect to="/" />;
        });
      }
    });
  };

  displayButtonToolbar() {
    if (this.context.token === undefined)
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
          <Button className="menu-button-big" onClick={e => this.userLogout(e)}>
            Wyloguj się
          </Button>
        </ButtonToolbar>
      );
  }


  render() {
    return (
      <Container className="Menu" fluid={true}>
            <div className="menu-background d-flex justify-content-center align-items-center">
                <Row>
                    <Col/>
                    <Col xs={7}>
                        <img src={logo} className="menu-logo"/>
                    </Col>
                    <Col />
                </Row>
                <Row className="menu-button-row">
                    <Col />
                    <Col>
                        {this.displayButtonToolbar()}
                    </Col>
                    <Col />
                </Row>
                <Row className="menu-button-row">
                    <Col />
                    <Col >
                        <ButtonToolbar>
                            <LinkContainer to={!this.context.token ? "/login" : "/cvEditor"}>
                                <Button className="menu-button-small menu-button-white" >Kreator CV</Button>
                            </LinkContainer>
                            <LinkContainer to={"/myCVs"}>
                                <Button className="menu-button-small menu-button-white" >Moje CV</Button>
                            </LinkContainer>
                            <LinkContainer to={!this.context.token ? "/login" : "/jobOffers"}>
                                <Button className="menu-button-small menu-button-white">Oferty pracy</Button>
                            </LinkContainer>
                            <LinkContainer to="/blog">
                                <Button className="menu-button-small menu-button-white">Blogi</Button>
                            </LinkContainer>
                        </ButtonToolbar>
                    </Col>
                    <Col />
                </Row>
            </div>
        </Container>
      )
    }
}

Menu.contextType = UserContext;

export default Menu;

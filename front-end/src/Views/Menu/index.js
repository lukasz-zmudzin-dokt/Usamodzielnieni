import React from "react";

import "Views/Menu/style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import logo from "assets/logo.png";

class Menu extends React.Component {

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
                            <ButtonToolbar>
                                <Button className="menu-button-big menu-button-purple" href="/newAccount" variant="outline-info">Utwórz konto</Button>
                                <Button className="menu-button-big menu-button-purple" href="/login" variant="outline-info">Zaloguj się</Button>
                            </ButtonToolbar>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="menu-button-row">
                        <Col />
                        <Col >
                            <ButtonToolbar>
                                <Button className="menu-button-small menu-button-purple" href="/cveditor" variant="outline-info">Kreator CV</Button>
                                <Button className="menu-button-small menu-button-purple" variant="outline-info">Od czego zacząć?</Button>
                                <Button className="menu-button-small menu-button-purple" variant="outline-info">Oferty pracy</Button>
                            </ButtonToolbar>
                        </Col>
                        <Col />
                    </Row>
                </div>
            </Container>

           /* <div className="menu text-center">
                <Row className="menu-row">

                    <a href="/cvEditor" className="menu-tile"><Col>Kreator tworzenia CV</Col></a>
                    <Col className="disabled menu-tile">Od czego zacząć usamodzielnienie</Col>
                    <Col className="disabled menu-tile">Kursy, staże, praca</Col>
                    <Col className="disabled menu-tile">Opis stanowisk</Col>
                </Row>
                <Row className="menu-row">
                    <Col className="disabled menu-tile">Testy zawodowe i osobowości</Col>
                    <Col className="disabled menu-tile">Historie usamodzielnionych</Col>
                    <Col className="disabled menu-tile">Znani z dorosłości</Col>
                    <Col className="disabled menu-tile">Jak zarządzać budżetem</Col>
                </Row>
            </div>*/

        )
    }
}

export default Menu;

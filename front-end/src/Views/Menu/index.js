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
                                <Button className="menu-button-big menu-button-white" href="/newAccount">Utwórz konto</Button>
                                <Button className="menu-button-big menu-button-white" href="/login">Zaloguj się</Button>
                            </ButtonToolbar>
                        </Col>
                        <Col />
                    </Row>
                    <Row className="menu-button-row">
                        <Col />
                        <Col >
                            <ButtonToolbar>
                                <Button className="menu-button-small menu-button-white" href="/cveditor" >Kreator CV</Button>
                                <Button className="menu-button-small menu-button-white disabled">Od czego zacząć?</Button>
                                <Button className="menu-button-small menu-button-white disabled">Oferty pracy</Button>
                            </ButtonToolbar>
                        </Col>
                        <Col />
                    </Row>
                </div>
            </Container>
        )
    }
}

export default Menu;

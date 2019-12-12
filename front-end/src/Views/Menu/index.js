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
                                <Button className="menu-button-small menu-button-purple disabled" variant="outline-info">Od czego zacząć?</Button>
                                <Button className="menu-button-small menu-button-purple disabled" variant="outline-info">Oferty pracy</Button>
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

import React from "react";
import Container from "react-bootstrap/Container";

import "Views/Menu/style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from 'react-bootstrap/Nav'

class Menu extends React.Component {

    render() {

        return (

            <div className="menu text-center">
                <Row className="menu-row">

                    <a href="/login"><Col>Kreator tworzenia CV</Col></a>
                    <Col className="disabled">Od czego zacząć usamodzielnienie</Col>
                    <Col className="disabled">Kursy, staże, praca</Col>
                    <Col className="disabled">Opis stanowisk</Col>
                </Row>
                <Row className="menu-row">
                    <Col className="disabled">Testy zawodowe i osobowości</Col>
                    <Col className="disabled">Historie usamodzielnionych</Col>
                    <Col className="disabled">Znani z dorosłości</Col>
                    <Col className="disabled">Jak zarządzać budżetem</Col>
                </Row>
            </div>

        )
    }
}

export default Menu;

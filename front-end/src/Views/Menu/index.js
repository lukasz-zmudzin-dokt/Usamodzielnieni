import React from "react";

import "Views/Menu/style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Menu extends React.Component {

    render() {

        return (

            <div className="menu text-center">
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
            </div>

        )
    }
}

export default Menu;

import React from 'react';
import {Navbar, Nav, Container, Button, Form} from "react-bootstrap";

import 'Views/PageHeader/headerLayout.css';
import logo from '../graphics/logo.png';

class HeaderTemplate extends React.Component {

    handleSelect = event => {

    };

    render() {
        const handleSelect = this;
        return(
            <Container className = "LayoutTemplate">
                <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                    <Navbar.Brand id="navbar_logo">
                        <img id="charity_logo" width='200vh' src={logo} alt="Usamodzielnieni"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="topMenu"/>
                    <Navbar.Collapse id="topMenu">
                        <Nav className="mr-auto" onSelect={handleSelect}>
                            <Nav.Link id="cvCreator">Kreator CV</Nav.Link>
                            <Nav.Link id="learningTheRopes">Od czego zacząć?</Nav.Link>
                            <Nav.Link id="jobOffers">Oferty pracy</Nav.Link>
                            <Nav.Link id="jobDescriptions">Opis stanowisk</Nav.Link>
                            <Nav.Link id="personalityTests">Testy</Nav.Link>
                            <Nav.Link id="stories">Historie usamodzielnionych</Nav.Link>
                            <Nav.Link id="moneyMgmt">Zarządzanie budżetem</Nav.Link>
                        </Nav>
                        <Form inline>
                            <Nav.Link id="phones" variant="light">Telefony</Nav.Link>
                            <Button id="loginButton" variant="outline-light">Logowanie</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        );
    }

}

export default HeaderTemplate;
import React from 'react';
import {Navbar, Nav, Container, Button, Form} from "react-bootstrap";

import 'Views/PageHeader/headerLayout.css';
import logo from '../graphics/logo.png';

class HeaderTemplate extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentLocation: this.props.start,
            isLoggedIn: this.props.isLoggedIn //status pobierany jakimś getem do api?
        };
    }

    displayMenu() {
        if (this.state.currentLocation !== "/")
            return (
                <Nav pullCenter className="mr-auto">
                    <Nav.Link id="cvEditor" href="/cvEditor">Kreator CV</Nav.Link>
                    <Nav.Link id="learningTheRopes">Od czego zacząć?</Nav.Link>
                    <Nav.Link id="jobOffers">Oferty pracy</Nav.Link>
                    <Nav.Link id="jobDescriptions">Opis stanowisk</Nav.Link>
                    <Nav.Link id="personalityTests">Testy</Nav.Link>
                    <Nav.Link id="stories">Historie usamodzielnionych</Nav.Link>
                    <Nav.Link id="moneyMgmt">Zarządzanie budżetem</Nav.Link>
                </Nav>
            );
    };

    displayButtonSet() {
        if (this.state.isLoggedIn)
            return (
                <Form inline pull-right>
                    <Button id="userProfile" variant="light" href="/user">Profil</Button>
                    <Button id="loginButton" variant="outline-light" onClick={e => this.userLogout(e)}>Wyloguj</Button>
                </Form>
            );
        else
            return (
                <Form inline pull-right>
                    <Button id="userProfile" variant="light" href="/newAccount">Rejestracja</Button>
                    <Button id="loginButton" variant="outline-light" href="/login">Logowanie</Button>
                </Form>
            );
    };

    userLogout = e => {
        this.setState({
            isLoggedIn: false
        });
        e.preventDefault();
        window.location.replace("/");
    };

    render() {
        return(
            <Container className = "LayoutTemplate">
                <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                    <Navbar.Brand id="navbar_logo">
                        <a href="/"><img id="charity_logo" width='200vh' src={logo} alt="Usamodzielnieni"/></a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="topMenu"/>
                    <Navbar.Collapse id="topMenu">
                        {this.displayMenu()}
                    </Navbar.Collapse>
                    <div id="nav_buttons">
                        {this.displayButtonSet()}
                    </div>
                </Navbar>
            </Container>
        );
    }

}

export default HeaderTemplate;
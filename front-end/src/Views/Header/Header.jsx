import React, {useContext, useEffect, useState} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { UserContext } from "context";
import { logoutUser } from "./apiCalls";
import "./style.css";
import {Redirect} from "react-router-dom";

const Header = () => {
    const context = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [logout, setLogout] = useState(false);

    const handleOpen = () => { setIsOpen(true); };
    const handleClose = () => { setIsOpen(false); };
    const handleLogout = async () => {
        try {
            const res = await logoutUser(context.token);
            context.logout();
            return <Redirect to="/contacts" />;
        } catch (e) {
            console.log(e);
        }
    }


    const main = {
        notLogged: [
            {
                name: "START",
                link: "/"
            },
            {
                name: "KONTAKT",
                link: "/contact"
            },
            {
                name: "BLOG",
                link: "/blog"
            },
            {
                name: "OFERTY PRACY",
                link: "/jobOffers"
            }
        ],
        logged: {
            standard: [
                {
                    name: "Kreator CV",
                    link: "cvEditor"
                },
                {
                    name: "Czat",
                    link: "/chat"
                }
            ],
            employer: [
                {
                    name: "Kreator Oferty pracy",
                    link: "/offerForm"
                }
            ]

        }
    };
    const loginButtons = {
        notLogged: [
            {
                name: "Rejestracja",
                link: "/newAccount"
            },
            {
                name: "Logowanie",
                link: "/login"
            }
        ],
        logged: [
            {
                name: "Wyloguj",
                link: "/logout"
            }
        ]
    };
/*

    useEffect(() => {
        console.log(context);
        if(context.token === undefined) {/!*
            setNavL(main.notLogged);
            setNavR(loginButtons.notLogged);*!/
        } else {

        }
    }, [context]);*/

    const leftNav = (
        <Nav className="mr-auto">
            <IndexLinkContainer to={"/"}>
                <Nav.Link className="navbar-left-button ">START</Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to={"/contact"}>
                <Nav.Link className="navbar-left-button ">KONTAKT</Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to={"/blog"}>
                <Nav.Link className="navbar-left-button ">BLOG</Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to={"/jobOffers"}>
                <Nav.Link className="navbar-left-button ">OFERTY PRACY</Nav.Link>
            </IndexLinkContainer>
        </Nav>
    );



    const accountDropdownNav = context.type === "standard" ? (
        <IndexLinkContainer to={"/myCVs"}>
            <NavDropdown.Item className="account-dropdown-button white">MOJE CV</NavDropdown.Item>
        </IndexLinkContainer>
    ) : context.type === "employer" ? (
        <IndexLinkContainer to={"/myOffers"}>
            <NavDropdown.Item className="account-dropdown-button white">MOJE OFERTY</NavDropdown.Item>
        </IndexLinkContainer>
    ) : context.type === "staff" ? (
        <div />
    ) : null;

    const rightNav = context.token === undefined ? (
        <Nav>
            <IndexLinkContainer to={"/newAccount"}>
                <Nav.Link className="navbar-right-button register-color">REJESTRACJA</Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to={"/login"}>
                <Nav.Link className="navbar-right-button login-color">LOGOWANIE</Nav.Link>
            </IndexLinkContainer>
        </Nav>
    ) : (
        <Nav>
            <Nav.Link className="navbar-right-button notification-color">POWIADOMIENIA</Nav.Link>
            {/*<IndexLinkContainer to={"/user"}>
                <Nav.Link className="navbar-right-button register-color">MOJE KONTO</Nav.Link>
            </IndexLinkContainer>*/}
            <NavDropdown id={"myAccDropdown"} title={<span className="white">MOJE KONTO</span>} className="navbar-right-button register-color"
                         onMouseEnter = { handleOpen }
                         onMouseLeave = { handleClose }
                         show={ isOpen }
                         >
                <IndexLinkContainer to={"/user"}>
                    <NavDropdown.Item className="account-dropdown-button white">MÓJ PROFIL</NavDropdown.Item>
                </IndexLinkContainer>
                { accountDropdownNav }
            </NavDropdown>
            <Nav.Link className="navbar-right-button login-color" onClick={handleLogout}>WYLOGUJ</Nav.Link>

        </Nav>
    );



    return (
        <Navbar collapseOnSelect expand="lg" sticky="top" className="font p-3">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {leftNav}
                {rightNav}
            </Navbar.Collapse>
            {logout ? <Redirect to={"/"} /> : null }
        </Navbar>
    );
};

export default Header;
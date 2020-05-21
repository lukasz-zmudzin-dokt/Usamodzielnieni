import React, {useContext, useEffect, useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { UserContext } from "context";
import "./style.css";

const Header = () => {
    const context = useContext(UserContext);
    const [navL, setNavL] = useState([]);
    const [navR, setNavR] = useState([]);
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
    const account = {
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
                name: "Moje Konto",

            },
            {
                name: "Wyloguj",
                link: "/logout"
            }
        ]
    };


    useEffect(() => {
        console.log(context);
        if(context.token === undefined) {
            setNavL(main.notLogged);
            setNavR(account.notLogged);
        } else {

        }
    }, [context]);

    return (
        <Navbar collapseOnSelect expand="lg" sticky="top" className="font p-3">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {navL.map((navItem) => (
                        <IndexLinkContainer to={navItem.link}>
                            <Nav.Link className="navbar-left-button">{navItem.name}</Nav.Link>
                        </IndexLinkContainer>
                    ))}
                </Nav>
                <Nav>
                    {navR.map((navItem) => (
                        <Nav.Link href={navItem.link} className="navbar-right-button">{navItem.name}</Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
import React from "react";
import Container from "react-bootstrap/Container";

import "Views/Menu/style.css";

import Backdrop from "../../img/menu-backdrop.png";

class Footer extends React.Component {

    render() {

        return (

            <div class="bg-div">

                <img src={Backdrop} alt="" class="bg align-self-center"></img>
                <a href="/login">
                    <div class="menu-tile menu-tile-1">Kreator CV</div>
                </a>
                <div class="menu-tile menu-tile-2">Od czego zacząć</div>
                <div class="menu-tile menu-tile-3">Kursy, staże, praca</div>
                <div class="menu-tile menu-tile-4">Opis stanowisk</div>
                <div class="menu-tile menu-tile-5">Testy zawodowe</div>
                <div class="menu-tile menu-tile-6">Historie usamodzielnonych</div>
                <div class="menu-tile menu-tile-7">Znani z dorosłości</div>
                <div class="menu-tile menu-tile-8">Jak zarządzać budżetem</div>
            </div>

        )
    }
}

export default Footer;

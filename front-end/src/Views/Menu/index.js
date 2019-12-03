import React from "react";
import Container from "react-bootstrap/Container";

import "Views/Menu/style.css";

import Backdrop from "../../img/menu-backdrop.png";

class Footer extends React.Component {

    render() {

        return (

            <div class="bg-div">

                <img src={Backdrop} alt="" class="bg align-self-center"></img>
                <div class="menu-tile menu-tile-1">Pierwsza rzecz</div>
                <div className="menu-tile menu-tile-2">Druga rzecz</div>
                <div className="menu-tile menu-tile-3">Trzecia rzecz</div>
            </div>

        )
    }
}

export default Footer;

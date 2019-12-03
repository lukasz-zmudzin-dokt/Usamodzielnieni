import React from "react";
import Container from "react-bootstrap/Container";

import FbIcon from "./facebook-128.ico"
import LinkedInIcon from "./linkedin-128.ico"
import YouTubeIcon from "./youtube-128.ico"

import "Views/MenuPage/style.css";

class LoginPage extends React.Component {



    render() {
        return (

            <Container className="menuPage">



                <div class="background-img">
                    <h1> hej hej </h1>
                    <img src="./Views/MenuPage/background_menu.tif" alt="" />
                </div>

                <div class="footer">
                    <div class="row justify-content-end mt-4">
                        <div class="col-8 mr-5">
                            <h2>KONTAKT</h2>
                        </div>
                    </div>
                    <div class="row justify-content-end mt-3">
                        <div class="col-8 align-self-end mr-5 pr-5">
                            <img src={FbIcon} alt="" class="footer-icon"/>
                            <img src={LinkedInIcon} alt="" class="footer-icon"/>
                            <img src={YouTubeIcon} alt="" className="footer-icon"/>
                        </div>
                    </div>

                </div>

            </Container>



        );
    }
}

export default LoginPage;

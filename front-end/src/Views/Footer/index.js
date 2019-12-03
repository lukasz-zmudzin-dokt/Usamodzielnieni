import React from "react";
import Container from "react-bootstrap/Container";

import FbIcon from "../../img/facebook-128.ico"
import LinkedInIcon from "../../img/linkedin-128.ico"
import YouTubeIcon from "../../img/youtube-128.ico"

import "Views/Footer/style.css";

class Footer extends React.Component {

    render() {
        return (

            <Container className="Footer">

                <div class="footer">
                    <div class="row justify-content-end mt-4">
                        <div class="col-8 mr-5">
                            <h2>KONTAKT</h2>
                        </div>
                    </div>
                    <div class="row justify-content-end mt-3">
                        <div class="col-8 align-self-end mr-5 pr-5">
                            <a href="https://www.facebook.com/fundacjaoneday/">
                                <img src={FbIcon} alt="" class="footer-icon"/>
                            </a>
                            <a href="https://www.linkedin.com/company/fundacja-one-day/about/">
                                <img src={LinkedInIcon} alt="" class="footer-icon"/>
                            </a>
                            <a href="https://www.youtube.com/channel/UCvWPmhiC5Q3gYVR3MPilHbQ">
                                <img src={YouTubeIcon} alt="" className="footer-icon"/>
                            </a>
                        </div>
                    </div>
                </div>

            </Container>
        );
    }
}

export default Footer;

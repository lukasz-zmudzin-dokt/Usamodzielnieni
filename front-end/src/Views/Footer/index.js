import React from "react";
import Container from "react-bootstrap/Container";
import FbIcon from "../../assets/facebook-128.ico";
import LinkedInIcon from "../../assets/linkedin-128.ico";
import YouTubeIcon from "../../assets/youtube-128.ico";
import Background from "../../assets/menu-backdrop.png";

import "Views/Footer/style.css";

class Footer extends React.Component {

    render() {
        console.log(Background);
        return (
            <Container className="Footer">
                <div className="footer">
                    <div className="row justify-content-end mt-4">
                        <div className="col-8 mr-5">
                            <h2>KONTAKT</h2>
                        </div>
                    </div>
                    <div className="row justify-content-end mt-3">
                        <div className="col-8 align-self-end mr-5 pr-5">
                            <a href="https://www.facebook.com/fundacjaoneday/">
                                <img src={FbIcon} alt="" className="footer-icon"/>
                            </a>
                            <a href="https://www.linkedin.com/company/fundacja-one-day/about/">
                                <img src={LinkedInIcon} alt="" className="footer-icon"/>
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

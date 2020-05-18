import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import "./style.css";

import kulczyk from "assets/footer/kulczyk-foundation-logo.png";
import pw from "assets/footer/politechnika-warszawska-logo.png";
import oneday from "assets/footer/oneday-logo.png";

import yt from "assets/footer/youtube-icon.png";
import tt from "assets/footer/twitter-icon.png";
import fb from "assets/footer/facebook-icon.png";
import ig from "assets/footer/instagram-icon.png";

const Footer = () => {
    return (
        <Container fluid className="font full-width">
            <Row className="p-5">
                <Col xs={{ span: 12, order: 2 }} sm={{ span: 12, order: 2 }} md={{ span: 3, order: 1}} className="p-4">
                    <Row className="company-title">
                        Partner
                    </Row>
                    <Row className="company-logo-row">
                        <img src={kulczyk} className="company-logo" alt="Kulczyk" />
                    </Row>
                </Col>
                <Col xs={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} md={{ span: 3, order: 2}} className="p-4">
                    <Row className="company-title">
                        Twórca technologiczny <br/> strony studenci
                    </Row>
                    <Row className="company-logo-row">
                        <img src={pw} className="company-logo" alt="pw" />
                    </Row>
                </Col>
                <Col xs={{ span: 12, order: 4 }} sm={{ span: 12, order: 4 }} md={{ span: 3, order: 3}} className="p-4">
                    <Row className="company-title">
                        Pomysłodawca, <br/> twórca treści:
                    </Row>
                    <Row className="company-logo-row">
                        <img src={oneday} className="company-logo" alt="oneday" />
                    </Row>
                </Col>
                <Col xs={{ span: 12, order: 1 }} sm={{ span: 12, order: 1 }} md={{ span: 2, order: 4, offset: 1 }} className="social-media-col">
                    <Row className="pt-3">
                        <a href="https://www.youtube.com/channel/UCbKE3BfzmHGfXbB9nmmswYw" target="_blank" className="d-flex align-items-end">
                            <img src={yt} className="social-media-icon" alt="yt" />
                            youtube
                        </a>
                    </Row>
                    <Row className="pt-3">
                        <a href="https://twitter.com/usamodzielnieni" target="_blank" className="d-flex align-items-end">
                            <img src={tt} className="social-media-icon" alt="tt" />
                            twitter
                        </a>
                    </Row>
                    <Row className="pt-3">
                        <a href="https://www.facebook.com/Usamodzielnieni-110914023943342" target="_blank" className="d-flex align-items-end">
                            <img src={fb} className="social-media-icon lol" alt="fb"/>
                            facebook
                        </a>
                    </Row>
                    <Row className="pt-3">
                        <a href="https://www.instagram.com/_usamodzielnieni_" target="_blank" className="d-flex align-items-end">
                            <img src={ig} className="social-media-icon" alt="ig" />
                            instagram
                        </a>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
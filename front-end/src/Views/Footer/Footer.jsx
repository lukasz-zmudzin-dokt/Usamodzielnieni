import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import kulczyk from "assets/footer/kulczyk-foundation-logo.png";
import pw from "assets/footer/politechnika-warszawska-logo.png";
import oneday from "assets/footer/oneday-logo.png";

import yt from "assets/footer/youtube-icon.png";
import tt from "assets/footer/twitter-icon.png";
import fb from "assets/footer/facebook-icon.png";
import ig from "assets/footer/instagram-icon.png";

const Footer = () => {
  return (
    <Container className="font full-width">
      <Row className="p-3">
        <Col
          xs={{ span: 12, order: 2 }}
          sm={{ span: 12, order: 2 }}
          md={{ span: 3, order: 1 }}
          className="p-4 mobile-col"
        >
          <Row className="company-title">Partner</Row>
          <Row className="company-logo-row">
            <a
              href="https://kulczykfoundation.org.pl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={kulczyk} className="company-logo" alt="Kulczyk" />
            </a>
          </Row>
        </Col>
        <Col
          xs={{ span: 12, order: 3 }}
          sm={{ span: 12, order: 3 }}
          md={{ span: 3, order: 2 }}
          className="p-4 mobile-col"
        >
          <Row className="company-title">Twórca strony - studenci</Row>
          <Row className="company-logo-row">
            <a
              href="https://www.pw.edu.pl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pw} className="company-logo" alt="pw" />
            </a>
          </Row>
        </Col>
        <Col
          xs={{ span: 12, order: 4 }}
          sm={{ span: 12, order: 4 }}
          md={{ span: 3, order: 3 }}
          className="p-4 mobile-col"
        >
          <Row className="company-title">Pomysłodawca, twórca treści</Row>
          <Row className="company-logo-row">
            <a
              href="https://www.oneday.com.pl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={oneday} className="company-logo" alt="oneday" />
            </a>
          </Row>
        </Col>
        <Col
          xs={{ span: 12, order: 1 }}
          sm={{ span: 12, order: 1 }}
          md={{ span: 3, order: 4 }}
          className="p-4 mobile-col"
        >
          <Row className="pt-3 social-media-row social-media-row-first">
            <a
              href="https://www.youtube.com/channel/UCbKE3BfzmHGfXbB9nmmswYw"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-end social-media-icon"
            >
              <Col className="p-0">
                <img src={yt} className="social-media-icon" alt="yt" />
              </Col>
              <Col className="pl-3 a">youtube</Col>
            </a>
          </Row>
          <Row className="pt-3 social-media-row">
            <a
              href="https://twitter.com/usamodzielnieni"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-end social-media-icon"
            >
              <Col className="p-0">
                <img src={tt} className="social-media-icon" alt="tt" />
              </Col>
              <Col className="pl-3 a">twitter</Col>
            </a>
          </Row>
          <Row className="pt-3 social-media-row">
            <a
              href="https://www.facebook.com/Usamodzielnieni-110914023943342"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-end social-media-icon"
            >
              <Col className="p-0">
                <img src={fb} className="social-media-icon lol" alt="fb" />
              </Col>
              <Col className="pl-3 a">facebook</Col>
            </a>
          </Row>
          <Row className="pt-3 social-media-row">
            <a
              href="https://www.instagram.com/_usamodzielnieni_"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-end social-media-icon"
            >
              <Col className="p-0">
                <img src={ig} className="social-media-icon" alt="ig" />
              </Col>
              <Col className="pl-3 a">instagram</Col>
            </a>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;

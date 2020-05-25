import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { MainPhoto, TvContainer, TilesContainer } from "./components";

const Menu = () => {
  return (
    <Container className="Menu" fluid={true}>
      <Row>
        <MainPhoto />
      </Row>
      <Row>
        <TvContainer />
      </Row>
      <Row>
        <TilesContainer />
      </Row>
    </Container>
  );
};

export default Menu;

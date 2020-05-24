import React from "react";
import { Row, Container } from "react-bootstrap";
import { TilesContainer } from "./components";

const Menu = () => {
  return (
    <Container className="Menu" fluid={true}>
      <Row>
        <TilesContainer />
      </Row>
    </Container>
  );
};

export default Menu;

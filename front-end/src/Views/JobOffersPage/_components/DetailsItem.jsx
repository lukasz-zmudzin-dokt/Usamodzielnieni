import React from "react";
import { Col } from "react-bootstrap";

const DetailsItem = ({ label, value }) => (
  <Col md="auto">
    <div>{label}:</div>
    <div>{value}</div>
  </Col>
);

export default DetailsItem;

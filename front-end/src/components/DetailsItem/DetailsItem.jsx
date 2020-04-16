import React from "react";
import { Col } from "react-bootstrap";

const DetailsItem = ({ label, children, ...rest }) => (
  <Col className="detailsItem" {...rest}>
    <div className="detailsItem__label">{label}</div>
    <div className="detailsItem__value">{children}</div>
  </Col>
);

export default DetailsItem;

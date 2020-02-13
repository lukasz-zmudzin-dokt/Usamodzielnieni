import React, { useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "Views/OfferForm/style.css";

const FormGroup = ({ header, setVal, array, type }) => {
  const [val, setValue] = useState("");

  const setInput = e => {
    const value = e.target.value;
    setValue(value);
    setVal(value);
  };

  const setDate = date => {
    setValue(date);
    setVal(date);
  };

  const setFormType = () => {
    switch (type) {
      case "select":
        const options = array.sort().map(val => <option>{val}</option>);
        return (
          <Form.Control as={type} val={val} onChange={setInput}>
            {options}
          </Form.Control>
        );
      case "textarea":
        return (
          <Form.Control
            as={type}
            onChange={setInput}
            controlId={header}
            className="offerForm__textarea"
          />
        );
      case "date":
        return (
          <Form.Row className="align-items-center">
            <p className="mr-2 mb-0">Do:</p>
            <DatePicker
              className="form-control"
              locale="pl"
              dateFormat="dd.MM.yyyy"
              selected={val}
              onChange={setDate}
            />
          </Form.Row>
        );
      default:
        return (
          <Form.Control
            type="text"
            placeholder={header}
            onChange={setInput}
            value={val}
          />
        );
    }
  };

  return (
    <Form.Group
      controlId={header}
      className={type === "textarea" ? "offerForm__textContainer" : ""}
    >
      <Form.Label>{header}</Form.Label>
      {setFormType()}
    </Form.Group>
  );
};

export default FormGroup;

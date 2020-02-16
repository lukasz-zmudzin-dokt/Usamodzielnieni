import React, { useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import "Views/OfferForm/style.css";

const FormGroup = ({ header, setVal, array, type, incorrect }) => {
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
        const options = array
          .sort()
          .map(val => <option key={val}>{val}</option>);
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
            required
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
              required
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
            required
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
      {incorrect ? (
        <Form.Control.Feedback type="invalid">
          {incorrect}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

FormGroup.propTypes = {
  header: PropTypes.string.isRequired,
  setVal: PropTypes.func.isRequired,
  array: PropTypes.array,
  type: PropTypes.string,
  incorrect: PropTypes.string
};

export default FormGroup;

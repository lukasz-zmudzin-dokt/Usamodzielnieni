import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import "Views/OfferForm/style.css";

const FormGroup = ({ header, setVal, array, type, incorrect, val }) => {
  const setInput = e => {
    const value = e.target.value;
    setVal(value);
  };

  const setDate = date => {
    setVal(date);
  };

  const setFormType = () => {
    switch (type) {
      case "select":
        const options = array
          .sort()
          .map(val => <option key={val}>{val}</option>);
        return (
          <Form.Control as={type} value={val} onChange={setInput} required>
            {options}
          </Form.Control>
        );
      case "textarea":
        return (
          <Form.Control
            as={type}
            onChange={setInput}
            value={val}
            required
            className="offerForm__textarea"
            minLength="1"
            maxLength="1000"
          />
        );
      case "date":
        return (
          <Form.Row className="align-items-center m-0">
            <DatePicker
              className="form-control"
              locale="pl"
              dateFormat="dd.MM.yyyy"
              selected={val}
              onChange={setDate}
              required
              minDate={new Date()}
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
            minLength="1"
            maxLength="10"
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

import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import "Views/OfferForm/style.css";

const FormGroup = ({
  header,
  setVal,
  array,
  type,
  incorrect,
  val,
  maxLength
}) => {
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
          <Form.Control
            data-testid="voivodeship"
            as={type}
            value={val}
            onChange={setInput}
            required
          >
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
            data-testid="description"
          />
        );
      case "date":
        return (
          <Form.Row className="align-items-center m-0">
            <DatePicker
              id="Ważne do:"
              className="form-control"
              locale="pl"
              dateFormat="dd.MM.yyyy"
              onChange={setDate}
              selected={val}
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
            maxLength={maxLength}
            data-testid="default"
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
  incorrect: PropTypes.string,
  maxLength: PropTypes.number
};

FormGroup.defaultProps = {
  array: []
};

export default FormGroup;

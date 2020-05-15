import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const FormGroup = ({
  header,
  val,
  setVal,
  array,
  type,
  incorrect,
  length,
  required,
  id,
  disabled,
  pattern,
  ...rest
}) => {
  const setInput = (e) => {
    const value = e.target.value;
    setVal(value);
  };

  const setDate = (date) => {
    setVal(date);
  };
  const setFormType = () => {
    switch (type) {
      case "select":
        return (
          <Form.Control
            as={type}
            value={val}
            onChange={setInput}
            required={required}
          >
            {required ? null : <option disabled>-- Wybierz --</option>}
            {array.map((val) => (
              <option key={val}>{val}</option>
            ))}
          </Form.Control>
        );
      case "textarea":
        return (
          <Form.Control
            as={type}
            placeholder="Wpisz treść... "
            onChange={setInput}
            value={val}
            required={required}
            className="offerForm__textarea"
            minLength={length.min}
            maxLength={length.max}
            disabled={disabled}
          />
        );
      case "date":
        return (
          <Form.Row className="align-items-center m-0">
            <DatePicker
              id={id}
              className="form-control"
              locale="pl"
              dateFormat="dd.MM.yyyy"
              onChange={setDate}
              selected={val}
              required={required}
              minDate={new Date()}
              placeholderText={header}
            />
          </Form.Row>
        );
      case "number":
        return (
          <Form.Control
            type={type}
            placeholder={header}
            onChange={setInput}
            value={val}
            required={required}
            disabled={disabled}
            pattern={pattern}
          />
        );
      case "tel":
        return (
          <Form.Control
            type={type}
            value={val}
            onChange={setInput}
            required={required}
          />
        );
      default:
        return (
          <Form.Control
            type="text"
            placeholder={header}
            onChange={setInput}
            value={val}
            required={required}
            minLength={length.min}
            maxLength={length.max}
            data-testid="default"
            disabled={disabled}
            pattern={pattern}
          />
        );
    }
  };

  return (
    <Form.Group
      controlId={id}
      className={type === "textarea" ? "textContainer" : ""}
      {...rest}
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
  length: PropTypes.object,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

FormGroup.defaultProps = {
  array: [],
  required: false,
  length: { min: 1, max: 50 },
  disabled: false,
};

export default FormGroup;

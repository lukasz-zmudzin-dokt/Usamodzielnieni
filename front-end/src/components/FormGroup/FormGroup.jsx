import React, { useState } from "react";
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
  step,
  ...rest
}) => {
  const [checked, setChecked] = useState(-1);
  const setInput = (e) => {
    const value = e.target.value;
    setVal(value);
  };

  const changeChecked = (newId) => {
    const value = id.split("--sort");
    if (newId === checked) {
      setChecked(-1);
    } else {
      if (newId === 0) {
        setChecked(newId);
        setVal(`-${value[0]}`);
      } else {
        setChecked(newId);
        setVal(`${value[0]}`);
      }
    }
  };

  const setDate = (date) => {
    setVal(date);
  };
  const setFormType = () => {
    switch (type) {
      case "check--sort":
        return (
          <div key={`inline-checkbox`}>
            <Form.Check
              inline
              label="Rosnąco"
              type="checkbox"
              checked={checked === 1 && val === `${id.split("--sort")[0]}`}
              onChange={() => changeChecked(1)}
              id={`inline-checkbox-${header}1`}
              data-testid={`checkUp-${id}`}
            />
            <Form.Check
              inline
              label="Malejąco"
              type="checkbox"
              checked={checked === 0 && val === `-${id.split("--sort")[0]}`}
              onChange={() => changeChecked(0)}
              id={`inline-checkbox-${header}2`}
              data-testid={`checkDown-${id}`}
            />
          </div>
        );
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
            min={length.min}
            max={length.max}
            step={step}
            data-testid="default"
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
            type={type || "text"}
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
  step: 1,
};

export default FormGroup;

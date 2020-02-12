import React, { useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

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
          <Form.Control as={type} onChange={setInput} controlId={header} />
        );
      case "date":
        return (
          <Form.Row>
            <p className="mr-1">Do:</p>
            <DatePicker
              className="complex_form_input_item"
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
    <Form.Group controlId={header}>
      <Form.Label>{header}</Form.Label>
      {setFormType()}
    </Form.Group>
  );
};

export default FormGroup;

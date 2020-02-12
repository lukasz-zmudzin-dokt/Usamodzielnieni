import React, { useState } from "react";
import { Form } from "react-bootstrap";

const FormGroup = ({ header, setVal, array, type }) => {
  const [val, setValue] = useState("");

  const setInput = e => {
    const value = e.target.value;
    setValue(value);
    setVal(value);
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
        return <Form.Control as={type} />;

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
    <Form.Group controlId="formBasicEmail">
      <Form.Label>{header}</Form.Label>
      {setFormType()}
    </Form.Group>
  );
};

export default FormGroup;

import React from "react";
import { Form } from "react-bootstrap";
import { adminGroup, commonGroup } from "constants/roles";
import {staffTypes} from "constants/staffTypes";

const renderCommon = (selectType) => (
  <Form.Group className="register_account_type">
    <Form.Label>{"Jestem:"}</Form.Label>
    <Form.Control
      data-testid="typeSelector"
      className="register_radio_type"
      as="select"
      onChange={selectType}
    >
      {commonGroup.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);

const renderAdmin = (selectType, cutType, current, setRole) => (
  <Form.Group className="register_account_type">
    <Form.Label>{"Uprawnienia nowego administratora:"}</Form.Label>
    {adminGroup.map((item) => (
      <Form.Check
        data-testid="typeSelector"
        className="register_radio_type"
        type="checkbox"
        label={item.placeholder}
        checked={current.includes(item.name)}
        onChange={current.includes(item.name) ? cutType : selectType}
        key={item.name}
        name={item.name}
      />
    ))}
    <Form.Control type="text" disabled={!current.includes(staffTypes.CHAT)} placeholder="Pełniona rola na czacie (opcjonalne)" onChange={setRole} />
  </Form.Group>
);

const TypeSelection = ({ isAdmin, selectType, cutType, current, setRole }) => {
  return isAdmin
    ? renderAdmin(selectType, cutType, current, setRole)
    : renderCommon(selectType);
};

export default TypeSelection;

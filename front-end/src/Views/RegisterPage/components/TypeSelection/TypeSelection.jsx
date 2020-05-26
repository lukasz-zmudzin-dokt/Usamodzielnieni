import React from "react";
import { Form } from "react-bootstrap";
import { adminGroup, commonGroup } from "constants/roles";
import { staffTypes } from "constants/staffTypes";

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

const onChange = (e, cutType, selectType, current) => {
  if (e.target.name === staffTypes.GUEST) {
    if (current.includes(e.target.name)) {
      cutType(e);
    } else {
      adminGroup.forEach((item) => cutType({ target: { name: item.name } }));
      selectType(e);
    }
  } else {
    if (current.includes(e.target.name)) {
      cutType(e);
    } else {
      cutType({ target: { name: staffTypes.GUEST } });
      selectType(e);
    }
  }
};

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
        onChange={(e) => onChange(e, cutType, selectType, current)}
        key={item.name}
        name={item.name}
      />
    ))}
    <Form.Control
      type="text"
      disabled={!current.includes(staffTypes.CHAT)}
      placeholder="Pełniona rola na czacie (opcjonalne)"
      onChange={setRole}
    />
  </Form.Group>
);

const TypeSelection = ({ isAdmin, selectType, cutType, current, setRole }) => {
  return isAdmin
    ? renderAdmin(selectType, cutType, current, setRole)
    : renderCommon(selectType);
};

export default TypeSelection;

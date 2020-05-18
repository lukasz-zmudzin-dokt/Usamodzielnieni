import React from "react";
import { Button } from "react-bootstrap";

const Items = ({ items, onCutClick, getItemId, getItemName }) => (
  <ul className="list-inline">
    {items.map((item, i) => (
      <li key={getItemId(item)} className="list-inline-item">
        <Button
          variant="dark"
          id={getItemId(item)}
          onClick={() => onCutClick(i)}
        >
          {getItemName(item)} x
        </Button>
      </li>
    ))}
  </ul>
);

export default Items;

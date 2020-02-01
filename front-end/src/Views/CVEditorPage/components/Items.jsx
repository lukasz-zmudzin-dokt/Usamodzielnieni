import React from "react";
import { Button } from "react-bootstrap";

const Items = ({ items, onCutClick, getItemId, getItemName }) => (
    <ul>
      {items.map(item => (
        <li className="list-inline-item">
          <Button
            variant="dark"
            id={getItemId(item)}
            onClick={e => onCutClick(e)}
          >
            {getItemName(item)} x
          </Button>
        </li>
      ))}
    </ul>
);

export default Items;

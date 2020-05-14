import { Button } from "react-bootstrap";
import React from "react";

const ButtonList = ({ array, cutItem }) => {
  if (array.length > 0) {
    return (
      <div className="mt-2">
        tagi:
        {array.map((item) => (
          <Button
            variant="info"
            className="mx-1 my-1"
            size="sm"
            onClick={cutItem}
            name={item}
          >
            {item} x
          </Button>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default ButtonList;

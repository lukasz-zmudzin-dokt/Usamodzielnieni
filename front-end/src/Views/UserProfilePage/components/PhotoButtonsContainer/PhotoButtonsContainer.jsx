import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const PhotoButtonsContainer = () => {
  return (
    <ButtonGroup size="sm">
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  );
};

export default PhotoButtonsContainer;

import React from "react";
import { Row, Form } from "react-bootstrap";

const CheckBoxList = ({ overlay, setOverlay }) => (
  <>
    <Form.Label>Wybierz przenikanie zdjęcia</Form.Label>
    <Row className="mx-1 mb-2 justify-content-center">
      <Form.Check
        inline
        label="Z lewej"
        type="checkbox"
        id="inline-checkbox-left"
        checked={overlay.left}
        onChange={() => setOverlay({ ...overlay, left: !overlay.left })}
      />
      <Form.Check
        inline
        label="Z góry"
        type="checkbox"
        id="inline-checkbox-top"
        checked={overlay.top}
        onChange={() => setOverlay({ ...overlay, top: !overlay.top })}
      />
      <Form.Check
        inline
        label="Z prawej"
        type="checkbox"
        id="inline-checkbox-right"
        checked={overlay.right}
        onChange={() => setOverlay({ ...overlay, right: !overlay.right })}
      />
    </Row>
  </>
);

export default CheckBoxList;

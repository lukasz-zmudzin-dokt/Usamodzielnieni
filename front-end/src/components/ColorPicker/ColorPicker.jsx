import { SketchPicker } from "react-color";
import React from "react";

const ColorPicker = ({ background, setBackground }) => (
  <SketchPicker
    className="w-100"
    disableAlpha
    color={background}
    onChangeComplete={(color) => setBackground(color.hex)}
    presetColors={[
      "#f3d689",
      "#feb549",
      "#e4a102",
      "#dcd7d7",
      "#ffb37b",
      "#d8a47f",
      "#e6a4a1",
      "#aa8acc",
      "#7469af",
      "#6699cc",
      "#a3b4c5",
      "#79c9a6",
      "#42b4a8",
    ]}
  />
);

export default ColorPicker;

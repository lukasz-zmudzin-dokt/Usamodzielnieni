import {SketchPicker} from "react-color";
import React from "react";

const ColorPicker = ({background, setBackground}) => (
    <SketchPicker
        className="w-100"
        disableAlpha
        color={background}
        onChangeComplete={color => setBackground(color.hex)}
    />
);

export default ColorPicker;
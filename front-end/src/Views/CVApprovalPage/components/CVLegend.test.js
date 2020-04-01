import React from "react";
import { render } from "@testing-library/react";
import CVLegend from "./CVLegend";

describe("CVLegend", () => {
    it("should render without crashing", () => {
        render(<CVLegend cvs={[{id: 0}]} />);
    });
});
import React from "react";
import { render } from "@testing-library/react";
import NoCVs from "./NoCVs";

describe("NoCVs", () => {
    it("should render without crashing with undefined parameter", () => {
        render(<NoCVs cvs={undefined} />);
    });
    it("should render without crashing with empty table", () => {
        render(<NoCVs cvs={[]} />);
    });
    it("should render without crashing with table with records", () => {
        render(<NoCVs cvs={[{id: 0}]} />);
    });
});
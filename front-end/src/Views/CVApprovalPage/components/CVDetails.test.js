import React from "react";
import { render } from "@testing-library/react";
import CVDetails from "./CVDetails";

describe("CVDetails", () => {
    it("should render without crashing", () => {
        render(<CVDetails cv={{id: 0, firstName: 'a', lastNAme: 'b', email: 'c'}}/>);
    });
});
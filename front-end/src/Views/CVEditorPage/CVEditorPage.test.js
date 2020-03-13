import React from "react";
import { render } from "@testing-library/react";
import CVEditorPage from "./index";

describe("CVEditor", () => {
    it("should render without crashing", () => {
        render(<CVEditorPage />);
    });

});
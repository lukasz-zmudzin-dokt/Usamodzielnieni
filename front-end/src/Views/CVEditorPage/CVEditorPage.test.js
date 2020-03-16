import React from "react";
import { render } from "@testing-library/react";
import CVEditorPage from "./index";
import renderer from "react-test-renderer";

describe("CVEditor", () => {
    it("should render without crashing", () => {
        render(<CVEditorPage />);
    });
    it("should look like snapshot", () => {
        const profile = renderer.create(<CVEditorPage />).toJSON();
        expect(profile).toMatchSnapshot();
    })

});
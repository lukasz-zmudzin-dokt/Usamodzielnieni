import React from "react";
import { render } from "@testing-library/react";
import MyOffersPage from "./MyOffersPage";
import renderer from "react-test-renderer";

describe("MyOffers", () => {
    it("should render without crashing", () => {
        render(<MyOffersPage />);
    });
    it("should look like snapshot", () => {
        const profile = renderer.create(<MyOffersPage />).toJSON();
        expect(profile).toMatchSnapshot();
    })
});
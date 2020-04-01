import React from "react";
import { render } from "@testing-library/react";
import MyOffersPage from "./MyOffersPage";

describe("MyOffers", () => {
    test("should look like snapshot", () => {
        const { profile } = render (<MyOffersPage />);
        expect(profile).toMatchSnapshot();
    })
});
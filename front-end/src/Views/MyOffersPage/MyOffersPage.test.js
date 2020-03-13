import React from "react";
import { render } from "@testing-library/react";
import MyOffersPage from "./MyOffersPage";

describe("MyOffers", () => {
    it("should render without crashing", () => {
        render(<MyOffersPage />);
    });

});
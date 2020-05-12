import React from "react";
import { render } from "@testing-library/react";
import ContactPage from "./ContactPage";

describe("ContactPage", () => {

    it("should render without crashing", () => {
        render(<ContactPage />);
    });

    it("should match snapshot", async () => {
        const { container } = render(
            <ContactPage />
        );
        expect(container).toMatchSnapshot();
    });
});
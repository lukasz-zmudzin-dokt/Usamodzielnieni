import React from "react";
import { render } from "@testing-library/react";
import PhoneCard from "./PhoneCard";

describe("PhoneCard", () => {

    it("should render without crashing", () => {
        render(<PhoneCard />);
    });

    it("should match snapshot", async () => {
        const { container } = render(
            <PhoneCard />
        );
        expect(container).toMatchSnapshot();
    });
});
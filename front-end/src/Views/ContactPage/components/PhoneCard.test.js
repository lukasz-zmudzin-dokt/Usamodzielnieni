import React from "react";
import { render } from "@testing-library/react";
import PhoneCard from "./PhoneCard";

describe("PhoneCard", () => {

    const contact = {
        name: "abc_name",
        number: "123456789"
    }

    it("should render without crashing", () => {
        const { getByText } = render(
            <PhoneCard name={contact.name} number={contact.number} />
        );
        expect(getByText("abc_name", { exact: false })).toBeInTheDocument();
        expect(getByText("123456789", { exact: false })).toBeInTheDocument();
    });

    it("should match snapshot", async () => {
        const { container } = render(
            <PhoneCard />
        );
        expect(container).toMatchSnapshot();
    });
});
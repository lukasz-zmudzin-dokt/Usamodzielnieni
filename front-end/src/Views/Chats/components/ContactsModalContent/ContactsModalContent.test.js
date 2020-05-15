import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import ContactsModalContent from "./ContactsModalContent";

describe("ContactsModalContent", () => {
    const contactsList = {
        contact: [
            {
                id: "123",
            },
            {
                id: "456"
            }
        ]
    };

    const msg = null;

    it("should render without crashing", () => {
        const { getByText } = render(
            <ContactsModalContent />
        );
        expect(getByText("Ładowanie listy kontaktów", { exact: false })).toBeInTheDocument();
    });

    it("should match snapshot", async () => {
        const { container } = render(<ContactsModalContent />);
        expect(container).toMatchSnapshot();
    });
});

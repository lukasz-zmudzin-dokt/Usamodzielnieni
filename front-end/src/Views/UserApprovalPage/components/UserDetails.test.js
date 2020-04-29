import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserDetails from "./UserDetails";

describe("UserDetails", () => {

    let testUsers = [
        {
            email: "qwe@qwe.vcb",
            id: "fcd32247-90ac-4394-92ca-27252bdc2ee9",
            type: "Standard",
            username: "testowyuser123"
        },
        {
            email: "qwe@qwe.vcb2",
            id: "fcd32247-90ac-4394-92ca-27252bdc2ee0",
            type: "Employer",
            username: "testowyuser1232"
        }
    ];

    it("should match snapshot", async () => {
        const { container, getByText } = render (
            <MemoryRouter>
                <UserDetails users={testUsers} activeUser={testUsers[0].id} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("testowyuser123 (Standard)"));
        expect(container).toMatchSnapshot();
    });

    it("should show users", async () => {
        const { getByText } = render (
            <MemoryRouter>
                <UserDetails users={testUsers} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("testowyuser1232 (Employer)"));
        expect(getByText("testowyuser1232 (Employer)")).toBeInTheDocument();
    });

});
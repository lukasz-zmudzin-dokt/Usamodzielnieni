import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserDetails from "./UserDetails";

describe("UserDetails", () => {

    let testUsers = [
        {
            date_joined: "2020-04-25T23:31:59.239639+02:00",
            email: "qwe@qwe.vcb",
            id: "fcd32247-90ac-4394-92ca-27252bdc2ee9",
            last_login: "2020-04-25T23:31:59.239631+02:00",
            status: "Waiting for verification",
            type: "Standard",
            username: "testowyuser123"
        },
        {
            date_joined: "2019-04-25T23:31:59.239639+02:00",
            email: "qwe@qwe.vcb2",
            id: "fcd32247-90ac-4394-92ca-27252bdc2ee0",
            last_login: "2020-04-25T23:32:59.239631+02:00",
            status: "Waiting for verification",
            type: "Employer",
            username: "testowyuser1232"
        }
    ];

    it("should match snapshot", async () => {
        const { container, getByText } = render (
            <MemoryRouter>
                <UserDetails users={testUsers} />
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
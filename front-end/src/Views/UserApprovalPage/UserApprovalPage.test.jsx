import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserApprovalPage from "./UserApprovalPage";

describe("UserApproval", () => {
    let failFetch;
    let apiUsers = [
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

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if(failFetch) {
                    resolve({ status: 500 });
                } else {
                    resolve({ status: 200, json: () => Promise.resolve(apiUsers) });
                }
            });
        });
    });

    beforeEach(() => {
        failFetch = false;
        jest.clearAllMocks();
    });

    it("should match snapshot", async () => {
        const { container, getByText } = render (
            <MemoryRouter>
                <UserApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("testowyuser123 (Standard)"));
        expect(container).toMatchSnapshot();
    });

    it("should load users", async () => {
        const { getByText } = render (
            <MemoryRouter>
                <UserApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("testowyuser123 (Standard)"));
        expect(getByText("testowyuser123 (Standard)")).toBeInTheDocument();
    });

    it("should view alert at api fail", async () => {
        failFetch = true;
        const { getByText } = render (
            <MemoryRouter>
                <UserApprovalPage />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Ups, wystąpił błąd."));
        expect(getByText("Ups, wystąpił błąd.")).toBeInTheDocument();
    });

    it("should view alert at api returning no users", async () => {
        apiUsers = [];
        const { getByText } = render (
            <MemoryRouter>
                <UserApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Brak kont do zatwierdzenia"));
        expect(getByText("Brak kont do zatwierdzenia")).toBeInTheDocument();
    });
});
import React from "react";
import {fireEvent, render, waitForElement} from "@testing-library/react";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import {UserProvider} from "context";
import Header from "./Header";
import {userStatuses} from "constants/userStatuses";
import {staffTypes} from "constants/staffTypes";

describe('Header', () => {
    let fetchCheck;
    const user = {
        notLogged: {
            token: undefined,
            type: undefined,
            data: undefined,
            login: jest.fn(),
            logout: jest.fn()
        },
        standard : {
            token: "123",
            type: "standard",
            data: {
                first_name: "Jan",
                last_name: "Kowalski",
                status: userStatuses.VERIFIED,
                username: "123123",
            },
            login: jest.fn(),
            logout: jest.fn()
        },
        employer: {
            token: "123",
            type: "employer",
            data: {
                first_name: "Jan",
                last_name: "Kowalski",
                status: userStatuses.VERIFIED,
                username: "123123",
            },
            login: jest.fn(),
            logout: jest.fn()
        },
        staff: {
            token: "123",
            type: "staff",
            data: {
                first_name: "Jan",
                last_name: "Kowalski",
                username: "123123",
                group_type: [staffTypes.VERIFICATION, staffTypes.CV, staffTypes.JOBS]
            },
            login: jest.fn(),
            logout: jest.fn()
        }
    }

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                switch (fetchCheck) {
                    case "fail":
                        resolve({ status: 500 });
                        break;
                    case "ok":
                        resolve({
                            status: 200,
                            json: () => Promise.resolve({}),
                        });
                        break;
                    default:
                        reject([]);
                }
            });
        });
    });

    it('should match snapshot - not logged in', async () => {
        const { container, getByText } = render (
            <UserProvider value={user.notLogged}>
                <MemoryRouter>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </MemoryRouter>
            </UserProvider>
        );
        await waitForElement(() => getByText("REJESTRACJA"));
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - logged in standard', async () => {
        const { container, getByText } = render (
            <UserProvider value={user.standard}>
                <MemoryRouter>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </MemoryRouter>
            </UserProvider>
        );
        await waitForElement(() => getByText("MOJE KONTO"));
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - logged in employer', async () => {
        const { container, getByText } = render (
            <UserProvider value={user.employer}>
                <MemoryRouter>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </MemoryRouter>
            </UserProvider>
        );
        await waitForElement(() => getByText("MOJE KONTO"));
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - logged in staff', async () => {
        const { container, getByText } = render (
            <UserProvider value={user.staff}>
                <MemoryRouter>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </MemoryRouter>
            </UserProvider>
        );
        await waitForElement(() => getByText("MOJE KONTO"));
        expect(container).toMatchSnapshot();
    });

    it('should logout user', async () => {
        fetchCheck = "ok";
        const { getByText } = render (
            <UserProvider value={user.standard}>
                <MemoryRouter>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </MemoryRouter>
            </UserProvider>
        );
        await waitForElement(() => getByText("WYLOGUJ"));
        fireEvent.click(getByText("WYLOGUJ"));
        expect(fetch).toHaveBeenCalled();
    });
    it('should logout user - error', async () => {
        fetchCheck = "fail";
        const { getByText } = render (
            <UserProvider value={user.standard}>
                <MemoryRouter>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </MemoryRouter>
            </UserProvider>
        );
        await waitForElement(() => getByText("WYLOGUJ"));
        fireEvent.click(getByText("WYLOGUJ"));
        expect(fetch).toHaveBeenCalled();
        await waitForElement(() => getByText("Wystąpił błąd."));
        expect(getByText("Wystąpił błąd.")).toBeInTheDocument();
    });
})
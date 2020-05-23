import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import Chats from "Views/Chats";

jest.mock("./components/ChatInfo", () => ({
    ChatInfo: ({ chat }) => <div> {chat.name} </div>,
}));

describe("Chats", () => {
    let failFetch = false;
    let apiChats = [];
    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if (failFetch) {
                    resolve({ status: 500 });
                } else if (init.method === "GET") {
                    resolve({
                        status: 200,
                        json: () => Promise.resolve(apiChats),
                    });
                } else {
                    reject({});
                }
            });
        });
    });

    beforeEach(() => {
        failFetch = false;
        apiChats = [
            { id: 1, name: "Wiadomość 1", user: {} },
            { id: 2, name: "Wiadomość 2", user: {} },
            { id: 3, name: "Wiadomość 3", user: {} },
        ];
        jest.clearAllMocks();
    });

    it("should render without crashing", async () => {
        const { container, getByText } = render(
            <MemoryRouter>
                <Chats />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Wiadomość 1"));

        expect(container).toMatchSnapshot();
    });

    it("should render loading alert when component is waiting for api response", async () => {
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <Chats />
            </MemoryRouter>
        );

        expect(
            getByText("Ładowanie wiadomości", { exact: false })
        ).toBeInTheDocument();
        expect(queryByText("Wiadomość 1")).not.toBeInTheDocument();
        await waitForElement(() => getByText("Wiadomość 1"));
    });

    it("should render error alert when api returns error", async () => {
        failFetch = true;
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <Chats />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Wystąpił błąd", { exact: false }));
        expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
        expect(queryByText("Wiadomość 1")).not.toBeInTheDocument();
    });

    it("should render info alert when api returns empty list", async () => {
        apiChats = [];
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <Chats />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Brak wiadomości", { exact: false }));
        expect(getByText("Brak wiadomości", { exact: false })).toBeInTheDocument();
        expect(queryByText("Wiadomość 1")).not.toBeInTheDocument();
    });

    it("should open contacts modal when button is clicked", async () => {
        const { getByText } = render(
            <MemoryRouter>
                <Chats />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Nowa wiadomość"));
        fireEvent.click(getByText("Nowa wiadomość"));

        await waitForElement(() => getByText("Wybierz osobę"));
    });
});

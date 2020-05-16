import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ChangeCVNameModal from "./ChangeCVNameModal";
import proxy from "config/api";

describe('ChangeCVNameModal', () => {
    let failFetch;
    let setName = jest.fn(() => Promise.resolve());

    beforeAll(() => {
        global.setShow = jest.fn();
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                if (failFetch) {
                    resolve({status: 500});
                } else {
                    resolve({status: 200});
                }
            });
        });
    });

    beforeEach(() => {
        failFetch = false;
        jest.clearAllMocks();
    });

    it('changes CV Name and it works (wow)', async () => {
        const { getByText, getByPlaceholderText } = render (
            <ChangeCVNameModal show={true} setCVNewName={setName} cvId={11111111} setShow={setShow} />
        );

        await waitForElement(() => getByText("Zmień nazwę"));
        fireEvent.change(getByPlaceholderText("Nowa nazwa CV"), {
            target: { value: "test" },
        });

        fireEvent.click(getByText("Zmień nazwę"));
        expect(getByPlaceholderText("Nowa nazwa CV").value).toBe("test");

        expect(fetch).toHaveBeenCalledWith(
            proxy.cv + "name/11111111/", {
                "body": "{\"name\":\"test\"}",
                "headers": {
                    "Authorization": "token undefined",
                    "Content-Type": "application/json"
                },
                "method": "PUT"
            }
        );
        await waitForElement(() => getByText("Pomyślnie zmieniono nazwę CV."));
        expect(getByText("Pomyślnie zmieniono nazwę CV.")).toBeInTheDocument();
        expect(setName).toHaveBeenCalled();
    });

    it('changes CV Name and it does not work (api fail)', async () => {
        const { getByText, getByPlaceholderText } = render (
            <MemoryRouter>
                <ChangeCVNameModal show={true} setCVNewName={e => {}} cvId={11111111} setShow={setShow} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Zmień nazwę"));

        fireEvent.change(getByPlaceholderText("Nowa nazwa CV"), {
            target: { value: "test" },
        });

        fireEvent.click(getByText("Zmień nazwę"));

        expect(fetch).toHaveBeenCalledTimes(1);

        await waitForElement(() => getByText("Wystąpił błąd", {exact: false}));
        expect(getByText("Wystąpił błąd", {exact: false})).toBeInTheDocument();
    });

    it('closes modal when not wanting to change cv name', async () => {
        const { getByText } = render (
            <MemoryRouter>
                <ChangeCVNameModal show={true} setCVNewName={e => {}} cvId={11111111} setShow={setShow} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Zostaw bieżącą nazwę"));
        fireEvent.click(getByText("Zostaw bieżącą nazwę"));
        expect(setShow).toHaveBeenCalledWith(false);
    });

    it('should render alert on empty form', () => {
        const { getByText } = render (
            <MemoryRouter>
                <ChangeCVNameModal show={true} setCVNewName={e => {}} cvId={11111111} setShow={setShow} />
            </MemoryRouter>
        );
        fireEvent.click(getByText("Zmień nazwę"));

        expect(getByText("Nazwa nie może być pusta!")).toBeInTheDocument();
    })

});
import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ChangeCVNameModal from "./ChangeCVNameModal";

describe('ChangeCVNameModal', () => {
    let fetchResult;

    beforeAll(() => {
        global.setShow = jest.fn();
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                switch (fetchResult) {
                    case "ok":
                        resolve({ status: 200, json: () => Promise.resolve("CV name changed to: test") });
                        break;
                    case "fail":
                        resolve({ status: 500 });
                        break;
                    case "odd":
                        resolve({ status: 200, json: () => Promise.resolve("wow, that's really odd response text!") });
                        break;
                    default:
                        reject({});
                        break;
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('changes CV Name and it works (wow)', async () => {
        fetchResult = "ok";
        const { getByText, getByPlaceholderText } = render (
            <MemoryRouter>
                <ChangeCVNameModal show={true} setCVNewName={e => {}} cvId={11111111} setShow={e => {}} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Zmień nazwę"));
        fireEvent.change(getByPlaceholderText("Nowa nazwa CV"), {
            target: { value: "test" },
        });

        fireEvent.click(getByText("Zmień nazwę"));

        expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/cv/name/11111111/", {
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
    });

    it('changes CV Name and it does not work (api fail)', async () => {
        fetchResult = "fail";
        const { getByText, getByPlaceholderText } = render (
            <MemoryRouter>
                <ChangeCVNameModal show={true} setCVNewName={e => {}} cvId={11111111} setShow={e => {}} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Zmień nazwę"));
        fireEvent.change(getByPlaceholderText("Nowa nazwa CV"), {
            target: { value: "test" },
        });

        fireEvent.click(getByText("Zmień nazwę"));

        expect(fetch).toHaveBeenCalledTimes(1);

        await waitForElement(() => getByText("Wystąpił błąd."));
        expect(getByText("Wystąpił błąd.")).toBeInTheDocument();
    });

    it('changes CV Name and it does not work (api odd response)', async () => {
        fetchResult = "odd";
        const { getByText, getByPlaceholderText } = render (
            <MemoryRouter>
                <ChangeCVNameModal show={true} setCVNewName={e => {}} cvId={11111111} setShow={e => {}} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Zmień nazwę"));
        fireEvent.change(getByPlaceholderText("Nowa nazwa CV"), {
            target: { value: "test" },
        });

        fireEvent.click(getByText("Zmień nazwę"));

        expect(fetch).toHaveBeenCalledTimes(1);

        await waitForElement(() => getByText("Wystąpił błąd."));
        expect(getByText("Wystąpił błąd.")).toBeInTheDocument();
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
    })

});
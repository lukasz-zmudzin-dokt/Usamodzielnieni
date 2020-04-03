import {fireEvent, render, waitForElement} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import PasswordResetPrompt from "./PasswordResetPrompt";
import React from "react";

describe('PasswordResetPrompt', () => {
    let apiFail;
    let apiResponseOK;

    beforeAll(() => {
        jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if(apiFail) {
                    resolve({status: 500});
                } else if (init.method === "POST") {
                    resolve({
                        status: 201,
                        json: () => Promise.resolve(apiResponseOK)
                    })
                } else {
                    reject({});
                }
            });
        });
    });

    beforeEach(() => {
        apiFail = false;
        jest.clearAllMocks();
    });

    it('should match snapshot', () => {
        const {container} = render(
            <MemoryRouter>
                <PasswordResetPrompt />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    it('should change value of form', () => {
        const {getByDisplayValue, getByPlaceholderText} = render (
            <MemoryRouter>
                <PasswordResetPrompt />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText("Email", {exact: false}), {
            target: {value: "jarzynek21@wp.pl"}
        });

        expect(getByDisplayValue("jarzynek21@wp.pl")).toBeInTheDocument();
    });

    it('should get call from API', async () => {
        const {container, getByPlaceholderText, getByTestId} = render(
            <MemoryRouter>
                <PasswordResetPrompt />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText("Email", {exact: false}), {
            target: {value: "jarzynek21@wp.pl"}
        });

        fireEvent.click(getByTestId("sendMailBtn", {exact: false}));
        await waitForElement(() => container.setCorrect());
        expect(container.setCorrect()).toHaveBeenCalledTimes(1);
    });

    it('should render callback message', async () => {
        const {getByPlaceholderText, getByTestId} = render(
            <MemoryRouter>
                <PasswordResetPrompt />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText("Email", {exact: false}), {
            target: {value: "jarzynek21@wp.pl"}
        });

        fireEvent.click(getByTestId("sendMailBtn", {exact: false}));
        await waitForElement(() => getByTestId("submit_message"));
        expect(getByTestId("submit_message", {exact: false})).toBeInTheDocument();
    });

    it('should redirect to next step onClick', async () => {
        const {component, getByPlaceholderText, getByTestId} = render(
            <MemoryRouter>
                <PasswordResetPrompt />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText("Email", {exact: false}), {
            target: {value: "jarzynek21@wp.pl"}
        });

        fireEvent.click(getByTestId("sendMailBtn", {exact: false}));
        await waitForElement(() => getByTestId("submit_message"));

        fireEvent.click(getByTestId("btn_redirect", {exact: false}));
        await waitForElement(() => component.renderRedirect()).toHaveBeenCalledTimes(1);
    });
});
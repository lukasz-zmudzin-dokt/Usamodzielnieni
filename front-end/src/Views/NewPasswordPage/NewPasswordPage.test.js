import NewPasswordPage from "./NewPasswordPage";
import PasswordResetPrompt from "../PasswordResetPrompt/PasswordResetPrompt";
import React from "react";
import {MemoryRouter} from "react-router-dom";
import {waitForElement, fireEvent, render} from "@testing-library/react";

describe('PasswordChange', () => {
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



    describe('NewPasswordPage', () => {
        it('should match snapshot', () => {
            const {container} = render(
                <MemoryRouter>
                    <PasswordResetPrompt />
                </MemoryRouter>
            );
            expect(container).toMatchSnapshot();
        });

        it('should get call from API', async () => {
            const {container, getByPlaceholderText, getByTestId} = render(
                <MemoryRouter>
                    <NewPasswordPage />
                </MemoryRouter>
            );

            fireEvent.change(getByPlaceholderText("Token", {exact: false}), {
                target: {value: "abc123"}
            });
            fireEvent.change(getByPlaceholderText("Nowe hasło", {exact: false}), {
                target: {value: "qwe123qwe"}
            });
            fireEvent.change(getByPlaceholderText("Powtórz hasło", {exact: false}), {
                target: {value: "qwe123qwe"}
            });

            fireEvent.click(getByTestId("btn_change_pass", {exact: false}));
            await waitForElement(() => container.setPasswordChanged());
            expect(container.setPasswordChanged()).toHaveBeenCalledTimes(1);
        });

        it('should render callback message', async () => {
            const {getByPlaceholderText, getByTestId} = render(
                <MemoryRouter>
                    <NewPasswordPage />
                </MemoryRouter>
            );

            fireEvent.change(getByPlaceholderText("Token", {exact: false}), {
                target: {value: "123abc"}
            });
            fireEvent.change(getByPlaceholderText("Nowe hasło", {exact: false}), {
                target: {value: "qwe123qwe"}
            });
            fireEvent.change(getByPlaceholderText("Powtórz hasło", {exact: false}), {
                target: {value: "qwe123qwe"}
            });

            fireEvent.click(getByTestId("btn_change_pass", {exact: false}));
            await waitForElement(() => getByTestId("passMsg", {exact: false}));
            expect(getByTestId("passMsg", {exact: false}).toBeInTheDocument());
        });

        it('should redirect automatically', async () => {
            const {container, getByPlaceholderText, getByTestId} = render(
                <MemoryRouter>
                    <NewPasswordPage />
                </MemoryRouter>
            );

            fireEvent.change(getByPlaceholderText("Token", {exact: false}), {
                target: {value: "abc1234"}
            });
            fireEvent.change(getByPlaceholderText("Nowe hasło", {exact: false}), {
                target: {value: "qwe123qwe"}
            });
            fireEvent.change(getByPlaceholderText("Powtórz hasło", {exact: false}), {
                target: {value: "qwe123qwe"}
            });

            fireEvent.click(getByTestId("btn_change_pass", {exact: false}));
            await waitForElement(() => container.redirectToLogin());
            expect(container.redirectToLogin()).toHaveBeenCalledTimes(1);
        })
    })
});
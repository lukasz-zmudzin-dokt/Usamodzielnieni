import PasswordChangeModal from "./PasswordChangeModal";
import React from "react";
import {fireEvent, render, wait} from "@testing-library/react";
import {AlertContext} from "../../../../context/AlertContext";

describe("passwordModalTest", () => {
    let apiFail, wrongPass, user, alertC, show, setShow;
    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                if (apiFail) {
                    resolve({status: 500});
                } else if (wrongPass) {
                    resolve({status: 403});
                } else {
                    resolve({status: 200, json: () => Promise.resolve("gituwa")});
                }
            });
        });
    });

    beforeEach(() => {
        alertC = {
            showAlert: jest.fn()
        };
        apiFail = false;
        wrongPass = false;
        user = {
            token: "123"
        };
        show = true;
        setShow = jest.fn();
    });

    it('should match snapshot', () => {
        const {container} = render(
            <PasswordChangeModal setShow={setShow} show={show} user={user} />
        );

       expect(container).toMatchSnapshot();
    });

    it('should validate form and change pass', async() => {
        const {getByLabelText, getByText} = render(
            <AlertContext.Provider value={alertC}>
                <PasswordChangeModal setShow={setShow} show={show} user={user} />
            </AlertContext.Provider>
        );

        fireEvent.change(getByLabelText("Poprzednie hasło"), {
            target: {value: "qweqweqwe"}
        });
        fireEvent.change(getByLabelText("Nowe hasło (min. 8 znaków)"), {
            target: {value: "qwe123qwe"}
        });
        fireEvent.change(getByLabelText("Powtórz nowe hasło"), {
            target: {value: "qwe123qwe"}
        });

        fireEvent.click(getByText("Zmień hasło"));

        await wait(() => expect(fetch).toHaveBeenCalled());

        expect(alertC.showAlert).toHaveBeenCalledWith(
            "Hasło zostało zmienione.", "success"
        );
    });

    it('should render alert on wrong old pass', async () => {
        wrongPass = true;
        const {getByLabelText, getByText} = render(
            <AlertContext.Provider value={alertC}>
                <PasswordChangeModal setShow={setShow} show={show} user={user} />
            </AlertContext.Provider>
        );

        fireEvent.change(getByLabelText("Poprzednie hasło"), {
            target: {value: "qwe123qwe"}
        });
        fireEvent.change(getByLabelText("Nowe hasło (min. 8 znaków)"), {
            target: {value: "qweasdqwe"}
        });
        fireEvent.change(getByLabelText("Powtórz nowe hasło"), {
            target: {value: "qweasdqwe"}
        });

        fireEvent.click(getByText("Zmień hasło"));

        await wait(() => expect(fetch).toHaveBeenCalled());

        expect(alertC.showAlert).toHaveBeenCalledWith(
            "Podano błędne poprzednie hasło."
        );
    });

    it('should render error on api fail', async () => {
        apiFail = true;
        const {getByLabelText, getByText} = render(
            <AlertContext.Provider value={alertC}>
                <PasswordChangeModal setShow={setShow} show={show} user={user} />
            </AlertContext.Provider>
        );

        fireEvent.change(getByLabelText("Poprzednie hasło"), {
            target: {value: "qwe123qwe"}
        });
        fireEvent.change(getByLabelText("Nowe hasło (min. 8 znaków)"), {
            target: {value: "qweasdqwe"}
        });
        fireEvent.change(getByLabelText("Powtórz nowe hasło"), {
            target: {value: "qweasdqwe"}
        });

        fireEvent.click(getByText("Zmień hasło"));

        await wait(() => expect(fetch).toHaveBeenCalled());

        expect(alertC.showAlert).toHaveBeenCalledWith(
            "Wystąpił błąd podczas zmiany hasła."
        );
    });
});
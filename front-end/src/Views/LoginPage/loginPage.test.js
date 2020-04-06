import React from "react";
import {fireEvent, render } from "@testing-library/react";
import LoginPage from "Views/LoginPage/index.js"
import {sendData} from "Views/LoginPage/functions/sendData";

import {MemoryRouter} from 'react-router-dom';
import { UserProvider } from "context";
import {getByTestId, getByText, waitForElement} from "@testing-library/react";
import LoginForm from "./components/loginForm";


describe( "LoginPageTest", () => {
    let credentials;
    let apiFail;
    let wrongCredentials;

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                if (apiFail) {
                    resolve({status: 500});
                }
                else if(wrongCredentials) {
                    resolve({status: 400});
                } else {
                    switch(init.method) {
                        case "POST":
                                resolve({
                                    status: 201,
                                    json: async() => new Promise((resolve, reject) => {
                                        resolve({
                                            token: "8881f9eb8f03571a40f742e73b799cb3accd1e9d",
                                            type: "Staff"
                                        })
                                    })
                                });
                            break;
                        default:
                            reject({});
                            break;
                     }
                 }
            });
         });
    });

    beforeEach(() => {
        apiFail = false;
        wrongCredentials = false;
        credentials  = {
            username: "qweqwe",
            password: "123123"
        };
        jest.clearAllMocks();
    });

    it("should match snapshot", () => {
        const { container } = render(
            <UserProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </UserProvider>);
        expect(container).toMatchSnapshot();
    });

    it('should show wrong credentials alert', async() => {
        wrongCredentials = true;
        const {container, getByPlaceholderText, getByText, getByTestId} = render(
            <UserProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </UserProvider>
        );
        //container.handleIncorrectResponse = jest.fn();

        fireEvent.change(getByPlaceholderText("Login"), {
            target: {value: "qweqwe"}
        });
        fireEvent.change(getByPlaceholderText("Hasło"), {
            target: {value: "qweqwe"}
        });

        fireEvent.click(getByTestId("loginBtn"));
        await waitForElement(() => getByText("Niepoprawny login lub hasło."));
        //expect(container.handleIncorrectResponse).toHaveBeenCalled();
        expect(getByText("Niepoprawny login lub hasło.")).toBeInTheDocument();
    });

    it('should show server error alert', async() =>{
        apiFail = true;
        const {container, getByPlaceholderText, getByText, getByTestId} = render(
            <UserProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </UserProvider>
        );
        //container.renderRedirect = jest.fn();

        fireEvent.change(getByPlaceholderText("Login"), {
            target: {value: "qweqwe"}
        });
        fireEvent.change(getByPlaceholderText("Hasło"), {
            target: {value: "qweqwe"}
        });

        fireEvent.click(getByTestId("loginBtn"));
        await waitForElement(() => getByText("Błąd serwera. Proszę spróbować później."));
        //expect(container.renderRedirect).not.toHaveBeenCalled();
        expect(getByText("Błąd serwera. Proszę spróbować później.")).toBeInTheDocument();
    });

    it('should call renderRedirect method', async () => {
        const { container, getByTestId, getByPlaceholderText} = render(
            <UserProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </UserProvider>);

        container.renderRedirect = jest.fn();
        
        fireEvent.change(getByPlaceholderText("Login"), {
            target: {value: "staff1"}
        });
        fireEvent.change(getByPlaceholderText("Hasło"), {
            target: {value: "staff1"}
        });

        fireEvent.click(getByTestId("loginBtn"));
        await waitForElement(() => container.renderRedirect);
        expect(container.renderRedirect).toHaveBeenCalled();
        //await waitForElement(() => getByTestId('redirect'));
    });
});


 /*   

    it('should call setRedirect method', async () => {
        const {component, getByTestId} = render(
            <UserProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </UserProvider>
        );

        let onBlur = (data) => component.setState({data});

        const {child} = render(
            <LoginForm data={credentials} onBlur={onBlur}/>
        );

        fireEvent.change(getByTestId(child, "loginPage_login", {exact: false}), {
            target: {value: "staff1"}
        });
        fireEvent.change(getByTestId(child, "loginPage_password", {exact: false}), {
            target: {value: "staff1"}
        });

        fireEvent.click(component, getByTestId("loginBtn", {exact: false}));
        await waitForElement(() => component.renderRedirect());

        expect(component.renderRedirect()).toHaveBeenCalled();
    });

    
    */

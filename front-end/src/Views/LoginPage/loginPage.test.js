import React from "react";
import {fireEvent, render} from "@testing-library/react";
import LoginPage from "Views/LoginPage/index.js"

import {BrowserRouter as Router, MemoryRouter} from 'react-router-dom';
import { UserProvider } from "context";
import {getByTestId, getByText, waitForElement} from "@testing-library/dom";


describe( "LoginPageTest", () => {
    let token;
    let apiFail;

    beforeAll(() => {
        token = '123';
        global.fetch = jest.fn().mockImplementation((input, init) => {
           return new Promise((resolve, reject) => {
               if (apiFail) {
                   resolve({status: 500});
               }
               switch(init.method) {
                   case "POST":
                       resolve({status: 200});
                       break;
                   default:
                       reject({});
                       break;
               }
           });
        });
    });

    beforeEach(() => {
        apiFail = false;
        jest.clearAllMocks();
    });

    it("should render without crashing", () => {
        render(
            <UserProvider>
                <Router>
                    <LoginPage />
                </Router>
            </UserProvider>
        );
    });

    it("should match snapshot", () => {
        const { container } = render(
            <UserProvider>
                <Router>
                    <LoginPage />
                </Router>
            </UserProvider>
        );
        expect(container).toMatchSnapshot();
    });

    it('should check credentials', async() => {
        const component = render(
            <UserProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </UserProvider>
        );

        component.setState({
            username: "abc",
            password: "abcabc"
        });

        fireEvent.click(getByTestId(component,"loginBtn"));
        await waitForElement(() => getByText(component,"coś poszło nie tak", {exact: false}));
        expect(getByText(component, "coś poszło nie tak", {exact: false})).toBeInTheDocument();
    });

    it('should call setRedirect method', async() => {
        const component = render(
            <UserProvider token={token}>
                <MemoryRouter>
                    <LoginPage {...props}/>
                </MemoryRouter>
            </UserProvider>
        );

        const setRedirect = jest.fn();

        expect(setRedirect).toHaveBeenCalledTimes(1);
    });
});

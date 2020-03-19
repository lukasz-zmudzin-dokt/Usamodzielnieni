import React from "react";
import { render } from "@testing-library/react";
import LoginPage from "Views/LoginPage/index.js"

import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "context";


describe( "LoginPageTest", () => {
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
});

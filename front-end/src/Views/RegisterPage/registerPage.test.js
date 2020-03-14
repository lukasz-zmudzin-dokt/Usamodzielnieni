import React from "react";
import { render } from "@testing-library/react";
import RegisterPage from "Views/RegisterPage/index.js"

import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "context";

describe( "RegisterPageTest", () => {
    it("should render without crashing", () => {
        render(
            <UserProvider>
                <Router>
                    <RegisterPage />
                </Router>
            </UserProvider>);
    });

    it("should match snapshot", () => {
        const { container } = render(
            <UserProvider>
                <Router>
                    <RegisterPage />
                </Router>
            </UserProvider>
        );
        expect(container).toMatchSnapshot();
    });
});

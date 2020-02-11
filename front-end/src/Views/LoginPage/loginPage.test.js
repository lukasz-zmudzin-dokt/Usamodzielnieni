import React from "react";
import { render } from "@testing-library/react";
import LoginPage from "Views/LoginPage/index.js"

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'redux/reducer';

describe( "LoginPageTest", () => {
    it("should render without crashing", () => {
        const store = createStore(reducer);
        render(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>);
    });

    it("should match snapshot", () => {
        const store = createStore(reducer);
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });
});

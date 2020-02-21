import HeaderTemplate from './headerTemplate';
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from "context/UserContext";


it('should render without crashing', () => {
    render(
        <UserProvider>
            <Router>
                <HeaderTemplate />
            </Router>
        </UserProvider>);
});
import HeaderTemplate from './headerTemplate';
import React from 'react';
import { render, queries, queryByTestId } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import {UserContext} from "context/UserContext";
import { WorkExperienceTab } from 'Views/CVEditorPage/components';
import menuPositions from "../../constants/menuPositions";


describe('navbar tests', () => {
    let user;
    let location;

    beforeAll(() => {
        user={
            token: undefined,
            type: undefined
        };
        location = {
            pathname: "/login"
        };
    });

    it('should render unlogged positions', () => {
        const { container, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter initialEntries={["/test"]}>
                    <HeaderTemplate />
                </MemoryRouter>
            </UserContext.Provider>
        );
        menuPositions.forEach((pos) => {
            if(pos.allowed === undefined) {
                expect(queryByText(pos.name)).toBeInTheDocument();
            } else {
                expect(queryByText(pos.name)).not.toBeInTheDocument();
            }
        });
    });
    it('should render standard positions', () => {
        user.token = "123";
        user.type = "Standard";
        const { container, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter initialEntries={["/test"]}>
                    <HeaderTemplate />
                </MemoryRouter>
            </UserContext.Provider>
        );
        menuPositions.forEach((pos) => {
            if(pos.allowed === undefined || pos.allowed.includes("Standard")) {
                expect(queryByText(pos.name)).toBeInTheDocument();
            } else {
                expect(queryByText(pos.name)).not.toBeInTheDocument();
            }
        });
    });
    
    it('should render staff positions', () => {
        user.token = "123";
        user.type = "Staff";
        const { container, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter initialEntries={["/test"]}>
                    <HeaderTemplate />
                </MemoryRouter>
            </UserContext.Provider>
        );
        menuPositions.forEach((pos) => {
            if(pos.allowed === undefined || pos.allowed.includes("Staff")) {
                expect(queryByText(pos.name)).toBeInTheDocument();
            } else {
                expect(queryByText(pos.name)).not.toBeInTheDocument();
            }
        });
    });

    it('should render employer positions', () => {
        user.token = "123";
        user.type = "Employer";
        const { container, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter initialEntries={["/test"]}>
                    <HeaderTemplate />
                </MemoryRouter>
            </UserContext.Provider>
        );
        menuPositions.forEach((pos) => {
            if(pos.allowed === undefined || pos.allowed.includes("Employer")) {
                expect(queryByText(pos.name)).toBeInTheDocument();
            } else {
                expect(queryByText(pos.name)).not.toBeInTheDocument();
            }
        });
    });
});
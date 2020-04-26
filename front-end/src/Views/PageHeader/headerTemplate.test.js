//import HeaderTemplate from './headerTemplate';
import HeaderTemplate from 'Views/PageHeader';
import React from 'react';
import { render, queries, queryByTestId, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import {UserContext} from "context/UserContext";
import menuPositions from "constants/menuPositions";
import { userTypes, staffTypes } from "constants/routes";


describe('navbar tests', () => {
    let user;
    let location;

    beforeAll(() => {
        user={
            token: undefined,
            type: undefined, 
            data: undefined
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
        user.type = userTypes.STANDARD;
        const { container, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter initialEntries={["/test"]}>
                    <HeaderTemplate />
                </MemoryRouter>
            </UserContext.Provider>
        );
        menuPositions.forEach((pos) => {
            if(pos.allowed === undefined || pos.allowed.includes(userTypes.STANDARD)) {
                expect(queryByText(pos.name)).toBeInTheDocument();
            } else {
                expect(queryByText(pos.name)).not.toBeInTheDocument();
            }
        });
    });
    
    it('should render staff positions', () => {
        user.token = "123";
        user.type = "Staff";
        //user.data = {group_type: staffTypes.CV};
        /*const { container, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter initialEntries={["/test"]}>
                    <HeaderTemplate />
                </MemoryRouter>
            </UserContext.Provider>
        );*/
        //let container, queryByText;

        for (const type in staffTypes) {
            user.data = {group_type: staffTypes[type]};
            cleanup();
            let { container, queryByText } = render(
                <UserContext.Provider value={user}>
                    <MemoryRouter initialEntries={["/test"]}>
                        <HeaderTemplate />
                    </MemoryRouter>
                </UserContext.Provider>
            );

            menuPositions.forEach((pos) => {
                if(pos.allowed === undefined || pos.allowed.includes(staffTypes[type]) || pos.allowed.includes(userTypes.STAFF)) {
                    expect(queryByText(pos.name)).toBeInTheDocument();
                } else {
                    expect(queryByText(pos.name)).not.toBeInTheDocument();
                }
            });
        }
        /*menuPositions.forEach((pos) => {
            if(pos.allowed === undefined || pos.allowed.includes(staffTypes.CV) || pos.allowed.includes(userTypes.STAFF)) {
                expect(queryByText(pos.name)).toBeInTheDocument();
            } else {
                expect(queryByText(pos.name)).not.toBeInTheDocument();
            }
        });*/
    });

    it('should render employer positions', () => {
        user.token = "123";
        user.type = userTypes.EMPLOYER;
        const { container, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter initialEntries={["/test"]}>
                    <HeaderTemplate />
                </MemoryRouter>
            </UserContext.Provider>
        );
        menuPositions.forEach((pos) => {
            if(pos.allowed === undefined || pos.allowed.includes(userTypes.EMPLOYER)) {
                expect(queryByText(pos.name)).toBeInTheDocument();
            } else {
                expect(queryByText(pos.name)).not.toBeInTheDocument();
            }
        });
    });
});
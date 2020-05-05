import React from "react";
import {waitForElement, render, fireEvent, waitForElementToBeRemoved, waitFor} from '@testing-library/react';
import {MemoryRouter, Router} from 'react-router-dom';
import {UserContext} from "context/UserContext";
import {createMemoryHistory} from 'history';
import MyCVsPage from "./MyCVsPage";

const renderWithRouter = (
    ui,
    {
        route = "/myCVs",
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) => {
    let context = { type: 'Standard' };
    return {
        ...render(
            <UserContext.Provider value={context}>
                <Router history={history}>{ui}</Router>
            </UserContext.Provider>
        ),
        history,
    };
};


describe('MyCVsPage', () => {
    let failFetch;
    let myCVs;
    let user;

    beforeAll(() => {
        global.open = jest.fn();
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise(((resolve, reject) => {
                if (failFetch) {
                    resolve({ status: 500 });
                }
                switch (init.method) {
                    case "GET":
                        resolve({ status: 200, json: () => Promise.resolve(myCVs) });
                        break;
                    case "DELETE":
                        resolve({status: 200});
                        break;
                    default:
                        reject({});
                        break;
                }
            }));
        });

        user = {
            type: 'Standard',
            token: '123'
        };
    });

    beforeEach(() => {
        myCVs = [
            {
                cv_id: 0,
                name: "jeden",
                basic_info: {
                    first_name: "Jarek",
                    last_name: "Arek",
                    email: "jamjestjarek@arek.pp"
                }
            },
            {
                cv_id: 1,
                name: "dwa",
                basic_info: {
                    first_name: "Ala",
                    last_name: "Mala",
                    email: "malaala@lala.la"
                }
            }
        ];
        failFetch = false;
        jest.clearAllMocks();
    });

    it('should match snapshot', async () => {
        const {container, getAllByText} = render(
            <UserContext.Provider value={user}>
                <MemoryRouter>
                    <MyCVsPage />
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitForElement(() => getAllByText('Zobacz CV', {exact: false}));
        expect(container).toMatchSnapshot();
    });

    it('should render alert on api fail', async () => {
        failFetch = true;
        const {getByText, queryByText} = render(
            <UserContext.Provider value={user}>
                <MemoryRouter>
                    <MyCVsPage />
                </MemoryRouter>
            </UserContext.Provider>
        );

        expect(getByText('Ładuję', {exact: false})).toBeInTheDocument();

        await waitForElement(() => getByText('Ups, coś poszło nie tak', {exact: false}));
        expect(getByText('Ups, coś poszło nie tak', {exact: false})).toBeInTheDocument();
        expect(queryByText('Ładuję', {exact: false})).not.toBeInTheDocument();
    });

    it('should render no cv alert', async () => {
        myCVs = [];
        const {getByText} = render(
            <UserContext.Provider value={user}>
                <MemoryRouter>
                    <MyCVsPage />
                </MemoryRouter>
            </UserContext.Provider>
        );
        await waitForElement(() => getByText('Nie masz', {exact: false}));
        expect(getByText('Nie masz', {exact: false})).toBeInTheDocument();
    });

    it('should redirect to cveditor', async () => {
        myCVs = [ myCVs[0] ];
        const {history, getByText} = renderWithRouter(
            <MyCVsPage />
        );

        await waitForElement(() => getByText('Edytuj'));
        fireEvent.click(getByText('Edytuj'));

        expect(history.location.pathname).toEqual('/cvEditor/0');
    });

    it('should delete cv on button click', async () => {
        myCVs = [ myCVs[0] ];
        const {getByText, queryByText} = render(
            <MemoryRouter>
                <MyCVsPage />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Usuń CV'));
        expect(getByText("jeden")).toBeInTheDocument();

        fireEvent.click(getByText("Usuń CV"));

        await waitForElementToBeRemoved(() => getByText("jeden"));
        await expect(queryByText("jeden")).not.toBeInTheDocument();
    });

    it('should render error on delete fail', async () => {
        myCVs = [ myCVs[0] ];
        const {getByText, queryByText} = render(
            <MemoryRouter>
                <MyCVsPage />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Usuń CV'));
        expect(getByText("jeden")).toBeInTheDocument();
        failFetch = true;
        fireEvent.click(getByText("Usuń CV"));

        const cv = await waitForElement(() => queryByText('jeden'));
        expect(cv).not.toBeNull();
        expect(getByText("jeden")).toBeInTheDocument();
        expect(getByText("Wystąpił błąd", {exact: false})).toBeInTheDocument();
    });

    it('should render alert on max cvs reached', async () => {
        myCVs = [myCVs[0], myCVs[1], myCVs[0], myCVs[1], myCVs[0]];
        const {getByText, getAllByText} = render(
            <MemoryRouter>
                <MyCVsPage />
            </MemoryRouter>
        );

        await waitForElement(() => getAllByText('Usuń CV'));
        expect(getByText("Osiągnięto maksymalną liczbę CV", {exact: false})).toBeInTheDocument();
    })
});
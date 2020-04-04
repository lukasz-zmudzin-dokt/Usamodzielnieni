import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import AddCvForm from "./AddCvForm";
import { MemoryRouter } from 'react-router-dom';

describe('AddCvForm', () => {
    let isVerified;
    let apiStatus;
    let user;
    let id;

    beforeAll(() => {
        user = { token: "abc123" };
        id = "123";
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                switch (init.method) {
                    case "POST":
                        resolve({ status: apiStatus });
                        break;
                    case "GET":
                        resolve( apiStatus !== 200 ? { status: apiStatus } : { 
                            status: 200,
                            json: () => Promise.resolve([ { cv_id: '1', is_verified: isVerified } ])
                        });
                        break;
                    default:
                        reject({});
                        break;
                }
            });
        });
    })
    beforeEach(() => {
        apiStatus = 200;
        isVerified = false;
        jest.clearAllMocks();
    });

    it('should render without crashing', async () => {
        const { container, getByText } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('utwórz nowe CV'));

        expect(container).toMatchSnapshot();
    });

    it('should render error alert when api returns error', async () => {
        apiStatus = 500;
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Wystąpił błąd', { exact: false }));
        expect(getByText('Wystąpił błąd', { exact: false })).toBeInTheDocument();
        expect(queryByText('Aplikuj do oferty')).not.toBeInTheDocument();
        expect(queryByText('Utwórz CV')).not.toBeInTheDocument();
    });

    it('should render button with link to cvEditor when user is not verified', async () => {
        isVerified = false;
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('utwórz nowe CV'));
        expect(getByText('utwórz nowe CV')).toBeInTheDocument();
        expect(queryByText('Aplikuj do oferty')).not.toBeInTheDocument();
    });

    it('should render apply button when user is verified', async () => {
        isVerified = true;
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Aplikuj do oferty'));
        expect(getByText('Aplikuj do oferty')).toBeInTheDocument();
        expect(queryByText('utwórz nowe CV')).not.toBeInTheDocument();
    });

    it('should render error alert when api returns error after click', async () => {
        isVerified = true;
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Aplikuj do oferty'));
        apiStatus = 500;
        fireEvent.click(getByText('Aplikuj do oferty'));

        await waitForElement(() => getByText('Wystąpił błąd', { exact: false }));
        expect(getByText('Wystąpił błąd', { exact: false })).toBeInTheDocument();
        expect(queryByText('Aplikuj do oferty')).not.toBeInTheDocument();
        expect(queryByText('utwórz nowe CV')).not.toBeInTheDocument();
    });

    it('should render fail alert when api returns already added status after click', async () => {
        isVerified = true;
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Aplikuj do oferty'));
        apiStatus = 400;
        fireEvent.click(getByText('Aplikuj do oferty'));

        await waitForElement(() => getByText('Już zaaplikowano', { exact: false }));
        expect(getByText('Już zaaplikowano', { exact: false })).toBeInTheDocument();
        expect(queryByText('Aplikuj do oferty')).not.toBeInTheDocument();
        expect(queryByText('utwórz nowe CV')).not.toBeInTheDocument();
    });

    it('should render success alert when api returns success after click', async () => {
        isVerified = true;
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Aplikuj do oferty'));
        fireEvent.click(getByText('Aplikuj do oferty'));

        await waitForElement(() => getByText('Pomyślnie zaaplikowano', { exact: false }));
        expect(getByText('Pomyślnie zaaplikowano', { exact: false })).toBeInTheDocument();
        expect(queryByText('Aplikuj do oferty')).not.toBeInTheDocument();
        expect(queryByText('utwórz nowe CV')).not.toBeInTheDocument();
    });

    it('should render loading alert when component is waiting for api response', async () => {
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        expect(getByText('Ładowanie', { exact: false })).toBeInTheDocument();
        expect(queryByText('Aplikuj do oferty')).not.toBeInTheDocument();
        expect(queryByText('utwórz nowe CV')).not.toBeInTheDocument();

        await waitForElement(() => getByText('utwórz nowe CV'));
    });
});
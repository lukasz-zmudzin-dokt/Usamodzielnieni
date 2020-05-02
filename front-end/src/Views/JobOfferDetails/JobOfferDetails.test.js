import React from "react";
import { render, waitForElement } from "@testing-library/react";
import JobOfferDetails from "./JobOfferDetails";
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from "context/UserContext";

jest.mock('./_components', () => ({ 
    AddCvForm: () => <div>AddCvForm</div>,
    RemoveCv: () => <div>RemoveCv</div>,
}));
jest.mock('constants/staffTypes', () => ({
    staffTypes: {
        JOBS: 'jobs'
    }
}));

describe('JobOfferDetails', () => {
    let offer;
    let apiStatus;
    let match;
    let user;

    beforeAll(() => {
        match = { params: { id: "123" }};
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                switch (init.method) {
                    case "GET":
                        resolve( apiStatus !== 200 ? { status: apiStatus } : { 
                            status: 200,
                            json: () => Promise.resolve(offer)
                        });
                        break;
                    default:
                        reject({});
                        break;
                }
            });
        });
    });

    beforeEach(() => {
        apiStatus = 200;
        offer = {
            id: '123',
            offer_name: 'Jakaś nazwa oferty',
            company_name: 'Jakaś nazwa firmy',
            company_address: 'Jakiś adres',
            voivodeship: 'Jakieś województwo',
            expiration_date: '2020-12-12',
            description: 'Jakiś baaaaaaaaaaaaaaaaaardzo dłuuuuuuuuuuuuuuugi opis oferty pracy\n123 asdasd'
        };
        user = {
            type: 'Standard',
            token: '123',
            data: {
                status: 'Verified'
            }
        }
        jest.clearAllMocks();
    });

    it('should render without crashing', async () => {
        const { container, getByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter>
                    <JobOfferDetails match={match}/>
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitForElement(() => getByText('Jakaś nazwa oferty'));

        expect(container).toMatchSnapshot();
    });

    it('should render loading alert when component is waiting for api response', async () => {
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <JobOfferDetails match={match}/>
            </MemoryRouter>
        );

        expect(getByText('Ładowanie', { exact: false })).toBeInTheDocument();
        expect(queryByText('Jakaś nazwa oferty')).not.toBeInTheDocument();
        await waitForElement(() => getByText('Jakaś nazwa oferty'));
    });

    it('should render error alert when api returns error', async () => {
        apiStatus = 500;
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <JobOfferDetails match={match}/>
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Wystąpił błąd', { exact: false }));
        expect(getByText('Wystąpił błąd', { exact: false })).toBeInTheDocument();
        expect(queryByText('Jakaś nazwa oferty')).not.toBeInTheDocument();
    });

    it('should render RemoveCv component when staff user group is jobs', async () => {
        user.type = 'Staff';
        user.data.group_type = 'jobs';

        const { getByText, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter>
                    <JobOfferDetails match={match}/>
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitForElement(() => getByText('Jakaś nazwa oferty'));
        expect(queryByText('AddCvForm')).not.toBeInTheDocument();
        expect(getByText('RemoveCv')).toBeInTheDocument();
    });

    it('should render AddCvForm component when standard user is verified', async () => {
        const { getByText, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter>
                    <JobOfferDetails match={match}/>
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitForElement(() => getByText('Jakaś nazwa oferty'));
        expect(queryByText('RemoveCv')).not.toBeInTheDocument();
        expect(getByText('AddCvForm')).toBeInTheDocument();
    });

    it('should not render AddCvForm and RemoveCv component when user is not verified and is not a jobs staff', async () => {
        user.data.status = 'Unverified'
        const { getByText, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter>
                    <JobOfferDetails match={match}/>
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitForElement(() => getByText('Jakaś nazwa oferty'));
        expect(queryByText('RemoveCv')).not.toBeInTheDocument();
        expect(queryByText('AddCvForm')).not.toBeInTheDocument();
    });
});
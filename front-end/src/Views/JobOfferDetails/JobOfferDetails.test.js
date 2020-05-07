import React from "react";
import { render, waitForElement,wait } from "@testing-library/react";
import JobOfferDetails from "./JobOfferDetails";
import { MemoryRouter } from 'react-router-dom';
import { UserContext,AlertContext } from "context";

jest.mock('./_components', () => ({ 
    AddCvForm: () => <div>AddCvForm</div>,
    RemoveOffer: () => <div>RemoveOffer</div>,
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
    let alertC = {
        showAlert: jest.fn(),
    };
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
        const { queryByText } = render(
          <AlertContext.Provider value={alertC}>
            <MemoryRouter>
              <JobOfferDetails match={match} />
            </MemoryRouter>
          </AlertContext.Provider>
        );

        await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
        expect(alertC.showAlert).toHaveBeenCalledWith(
          "Wystąpił błąd podczas ładowania oferty."
        );
        expect(queryByText('Jakaś nazwa oferty')).not.toBeInTheDocument();
    });

    it('should render RemoveOffer component when staff user group is jobs', async () => {
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
        expect(getByText('RemoveOffer')).toBeInTheDocument();
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
        expect(queryByText('RemoveOffer')).not.toBeInTheDocument();
        expect(getByText('AddCvForm')).toBeInTheDocument();
    });

    it('should not render AddCvForm and RemoveOffer component when user is not verified and is not a jobs staff', async () => {
        user.data.status = 'Unverified'
        const { getByText, queryByText } = render(
            <UserContext.Provider value={user}>
                <MemoryRouter>
                    <JobOfferDetails match={match}/>
                </MemoryRouter>
            </UserContext.Provider>
        );

        await waitForElement(() => getByText('Jakaś nazwa oferty'));
        expect(queryByText('RemoveOffer')).not.toBeInTheDocument();
        expect(queryByText('AddCvForm')).not.toBeInTheDocument();
    });
});
import React from "react";
import { render, waitForElement } from "@testing-library/react";
import JobOfferDetails from "./JobOfferDetails";
import { MemoryRouter } from 'react-router-dom';

jest.mock('./_components', () => ({ AddCvForm: (props) => (<div></div>) }));

describe('JobOfferDetails', () => {
    let offer;
    let apiStatus;
    let match;

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
    })
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
        jest.clearAllMocks();
    });

    it('should render without crashing', async () => {
        const { container, getByText } = render(
            <MemoryRouter>
                <JobOfferDetails match={match}/>
            </MemoryRouter>
        );

        await waitForElement(() => getByText('Jakaś nazwa oferty'));

        expect(container).toMatchSnapshot();
    });

    it('should render loading alert when component is waiting for api response', () => {
        const { getByText, queryByText } = render(
            <MemoryRouter>
                <JobOfferDetails match={match}/>
            </MemoryRouter>
        );

        expect(getByText('Ładowanie', { exact: false })).toBeInTheDocument();
        expect(queryByText('Jakaś nazwa oferty')).not.toBeInTheDocument();
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
});
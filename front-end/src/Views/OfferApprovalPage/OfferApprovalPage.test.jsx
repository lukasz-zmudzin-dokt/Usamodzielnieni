import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OfferApprovalPage from "./OfferApprovalPage";

describe('OfferApproval', () => {
    let fetchType;
    let apiOffers = [
        {
            category: "PR",
            company_address: {
                city: "Gdynia",
                postal_code: "03-371",
                street: "Wiejska",
                street_number: "25"
                },
            company_name: "TruthMinistry",
            description: "Szukamy osob dobrze zorientowanych w mediach spolecznosciowych. Oferujemy dobra place, karte Multisport...",
            expiration_date: "2020-05-28",
            id: "dsfsdfwergewr",
            offer_name: "Administrator funpage'a",
            type: "Praca",
            voivodeship: "pomorskie"
        },
        {
            category: "IT",
            company_address: {
                city: "Wwa",
                postal_code: "21-371",
                street: "Polna",
                street_number: "225"
            },
            company_name: "Firemka",
            description: "Szukamy lajkoników w mediach spolecznosciowych. Oferujemy dobra place, karte Multisport...",
            expiration_date: "2020-12-21",
            id: "sadgergerfwefwe",
            offer_name: "Lajkonik",
            type: "Praca",
            voivodeship: "mazowieckie"
        }
    ];

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                switch (fetchType) {
                    case "ok":
                        resolve({ status: 200, json: () => Promise.resolve({results: apiOffers}) });
                        break;
                    case "empty":
                        resolve({ status: 200 , json: () => Promise.resolve({results: []})});
                        break;
                    case "fail":
                        resolve({ status: 500 });
                        break;
                    default:
                        reject();
                        break;
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should match snapshot', async () => {
        fetchType = "ok";
        const { container, getByText } = render (
            <MemoryRouter>
                <OfferApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("pomorskie"));
        expect(container).toMatchSnapshot();
    });

    it('should load offers', async () => {
        fetchType = "ok";
        const { getByText } = render (
            <MemoryRouter>
                <OfferApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("pomorskie"));
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should view alert at api fail', async () => {
        fetchType = "fail";
        const { getByText } = render (
            <MemoryRouter>
                <OfferApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Ups, wystąpił błąd."));
        expect(getByText("Ups, wystąpił błąd.")).toBeInTheDocument();
    });

    it('should view alert at api returning no offers', async () => {
        fetchType = "empty";
        const { getByText } = render (
            <MemoryRouter>
                <OfferApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Brak ofert do zatwierdzenia"));
        expect(getByText("Brak ofert do zatwierdzenia")).toBeInTheDocument();
    });
})
import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import MyOffer from "./MyOffer";
import { MemoryRouter } from "react-router-dom";

describe("MyOffers", () => {
    let fetchCheck;
    let testOffer = {
        category: "IT",
        company_address: "adress1",
        company_name: "company1",
        description: "description123",
        expiration_date: "2020-05-28",
        id: "47991e86-4b42-4507-b154-1548bf8a3bd3",
        offer_name: "offer2",
        type: "Staż",
        voivodeship: "mazowieckie"
    };
    let apiPeople = [
        {
            cv_url: "/media/blank_test_cv",
            date_posted: "2020-04-06T01:34:27.899000+02:00",
            email: "standard1@standard1.com",
            first_name: "standard1",
            job_offer: "47991e86-4b42-4507-b154-1548bf8a3bd3",
            last_name: "standard1",
            user_id: "b582b042-d6d8-4e57-9447-564a6748b4f7"
        }
    ];

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                switch (fetchCheck) {
                    case "fail":
                        resolve({ status: 500 });
                        break;
                    case "empty":
                        resolve({ status: 200, json: () =>Promise.resolve([]) });
                        break;
                    case "normal":
                        resolve({ status: 200, json: () =>Promise.resolve(apiPeople) });
                        break;
                    default:
                        reject([]);
                }
            });
        });
    });

    beforeEach(() => {
        fetchCheck = "normal";
        jest.clearAllMocks();
    });

    it('should match snapshot', async () => {
        const { container, getByText } = render (
            <MemoryRouter>
                <MyOffer offer={testOffer} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("offer2"));

        expect(container).toMatchSnapshot();

    });

});



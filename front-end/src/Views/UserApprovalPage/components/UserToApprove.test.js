import React from "react";
import {render, waitForElement, fireEvent} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserToApprove from "./UserToApprove";
import {act} from "react-dom/test-utils";

describe("UserApproval", () => {
    let fetchUserType;

    let user = {
        standard: {
            date_joined: "2020-04-26T00:49:14.890182+02:00",
            email: "abc@gmail.com",
            id: "2949ad29-27da-49a0-aba2-1aa7b5bfa20b",
            last_login: "2020-04-26T00:49:14.890166+02:00",
            status: "Waiting for verification",
            type: "Standard",
            username: "standard0"
        },
        employer: {
            date_joined: "2020-04-26T00:40:08.514725+02:00",
            email: "string@aaa.aaa",
            id: "e8ac8431-cc60-423d-a044-9d048285f2ee",
            last_login: "2020-04-26T00:40:08.514717+02:00",
            status: "Waiting for verification",
            type: "Employer",
            username: "string"
        }
    };
    let apiUserDetails = {
        standard: {
            date_joined: "2020-04-26T00:49:14.890182+02:00",
            email: "abc@gmail.com",
            facility_address: {
                city: "Warszawa",
                postal_code: "11-123",
                street: "Aleja Niepodległości",
                street_number: "20"
            },
            facility_name: "facility",
            first_name: "Jan",
            id: "2949ad29-27da-49a0-aba2-1aa7b5bfa20b",
            last_login: "2020-04-26T00:49:14.890166+02:00",
            last_name: "Kowalski",
            phone_number: "+48123123123",
            status: "Waiting for verification",
            username: "standard0"
        },
        employer: {
            company_address: {
                city: "string",
                postal_code: "01-234",
                street: "string",
                street_number: "693"
            },
            company_name: "string",
            date_joined: "2020-04-26T00:40:08.514725+02:00",
            email: "string@aaa.aaa",
            first_name: "string",
            id: "e8ac8431-cc60-423d-a044-9d048285f2ee",
            last_login: "2020-04-26T00:40:08.514717+02:00",
            last_name: "string",
            nip: "5555555555",
            phone_number: "+48123456789",
            status: "Waiting for verification",
            username: "string"
        }
    };

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if(failFetch) {
                    resolve({ status: 500 });
                }
                switch (init.method) {
                    case "GET":
                        switch (fetchUserType) {
                            case "Standard":
                                resolve({status: 200, json: () => Promise.resolve(apiUserDetails.standard) });
                                break;
                            case "Employer":
                                resolve({status: 200, json: () => Promise.resolve(apiUserDetails.employer) });
                                break;
                            default:
                                reject({});
                                break;
                        }
                        break;
                    case "POST":
                        resolve({status: 200});
                        break;
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

   /* it('should fetch user data', async () => {
        fetchUserType = "standard";
        const { getByText } = render (
            <MemoryRouter>
                <UserToApprove user={user.standard} />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("standard0 (Standard)"));
        fireEvent.click(getByText("standard0 (Standard)"));

    });*/

});
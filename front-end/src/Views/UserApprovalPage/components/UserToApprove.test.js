import React from "react";
import {render, waitForElement, fireEvent} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserToApprove from "./UserToApprove";
import {AlertContext} from 'context';

describe("UserApproval", () => {
    let failFetch;
    let fetchUserType;
    let postType;
    let contextA = {
        open: true,
        changeVisibility: jest.fn(),
        message: "abc",
        changeMessage: jest.fn(),
        showAlert: jest.fn(),
    };

    let user = {
        standard: {
            email: "abc@gmail.com",
            id: "2949ad29-27da-49a0-aba2-1aa7b5bfa20b",
            type: "Standard",
            username: "standard0"
        },
        employer: {
            email: "string@aaa.aaa",
            id: "e8ac8431-cc60-423d-a044-9d048285f2ee",
            type: "Employer",
            username: "string"
        }
    };
    let apiUserDetails = {
        standard: {
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
            last_name: "Kowalski",
            phone_number: "+48123123123",
            username: "standard0"
        },
        employer: {
            company_address: {
                city: "Ten test i tak nie przejdzie",
                postal_code: "69-123",
                street: "string",
                street_number: "693"
            },
            company_name: "string",
            email: "string@aaa.aaa",
            first_name: "string",
            id: "e8ac8431-cc60-423d-a044-9d048285f2ee",
            last_name: "string",
            nip: "5555555555",
            phone_number: "+48123456789",
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
                        switch(postType) {
                            case "Approve":
                                resolve({status: 200, json: () => Promise.resolve("User successfully verified.") });
                                break;
                            case "Reject":
                                resolve({status: 200, json: () => Promise.resolve("User status successfully set to not verified.") });
                                break;
                            default:
                                reject({});
                                break;
                        }
                        break;
                    default:
                        reject({});
                        break;
                }
            });
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

   it('should match snapshot (Standard type user) ', async () => {
       failFetch = false;
       fetchUserType = "Standard";

       const { container, getByText } = render (
           <MemoryRouter>
               <UserToApprove user={user.standard} activeUser={user.standard.id} />
           </MemoryRouter>
       );
       await waitForElement(() => getByText("11-123 Warszawa"));
       expect(container).toMatchSnapshot();
   });

    it('should match snapshot (Employer type user) ', async () => {
        failFetch = false;
        fetchUserType = "Employer";

        const { container, getByText } = render (
            <MemoryRouter>
                <UserToApprove user={user.employer} activeUser={user.employer.id} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("69-123 Ten test i tak nie przejdzie"));
        expect(container).toMatchSnapshot();
    });

    it("should view alert at api fail", async () => {
        failFetch = true;
        const { getByText,queryByText } = render (
            <AlertContext.Provider value={contextA}>
            <MemoryRouter>
                <UserToApprove user={user.standard} activeUser={user.standard.id} />
            </MemoryRouter>
            </AlertContext.Provider>
        );

        await waitForElement(() => getByText("Nazwa użytkownika"));
        expect(queryByText("Jan")).not.toBeInTheDocument();
    });

    it('should accept user', async () => {
        failFetch = false;
        fetchUserType = "Standard";
        postType = "Approve";
        const { getByText } = render (
            <AlertContext.Provider value={contextA}>
            <MemoryRouter>
                <UserToApprove user={user.standard} activeUser={user.standard.id} />
            </MemoryRouter>
            </AlertContext.Provider>
        );
        await expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/account/admin/user_details/2949ad29-27da-49a0-aba2-1aa7b5bfa20b/",
            {
                headers: {
                    Authorization: "token undefined",
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );
        await waitForElement(() => getByText("11-123 Warszawa"));
        fireEvent.click(getByText("Akceptuj"));
        await expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/account/admin/user_admission/2949ad29-27da-49a0-aba2-1aa7b5bfa20b/",
            {
                headers: {
                    Authorization: "token undefined",
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );
    });

    it('should reject user', async () => {
        failFetch = false;
        fetchUserType = "Standard";
        postType = "Reject";
        const { getByText } = render (
            <AlertContext.Provider value={contextA}>
            <MemoryRouter>
                <UserToApprove user={user.standard} activeUser={user.standard.id} />
            </MemoryRouter>
            </AlertContext.Provider>
        );
        await expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/account/admin/user_details/2949ad29-27da-49a0-aba2-1aa7b5bfa20b/",
            {
                headers: {
                    Authorization: "token undefined",
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );
        await waitForElement(() => getByText("11-123 Warszawa"));
        fireEvent.click(getByText("Odrzuć"));
        await expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/account/admin/user_rejection/2949ad29-27da-49a0-aba2-1aa7b5bfa20b/",
            {
                headers: {
                    Authorization: "token undefined",
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );
    });

});
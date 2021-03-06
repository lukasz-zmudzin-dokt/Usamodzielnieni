import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  wait,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserToApprove from "./UserToApprove";
import { AlertContext } from "context";
import { userTypes } from "constants/userTypes";

describe("UserApproval", () => {
  let failFetch;
  let fetchUserType;
  let postType;
  let contextA = {
    showAlert: jest.fn(),
  };

  let user = {
    standard: {
      email: "abc@gmail.com",
      id: "2949ad29-27da-49a0-aba2-1aa7b5bfa20b",
      type: userTypes.STANDARD,
      username: "standard0",
    },
    employer: {
      email: "string@aaa.aaa",
      id: "e8ac8431-cc60-423d-a044-9d048285f2ee",
      type: userTypes.EMPLOYER,
      username: "string",
    },
  };
  let apiUserDetails = {
    standard: {
      email: "abc@gmail.com",
      facility_address: {
        city: "Warszawa",
        postal_code: "11-123",
        street: "Aleja Niepodległości",
        street_number: "20",
      },
      facility_name: "facility",
      first_name: "Jan",
      id: "2949ad29-27da-49a0-aba2-1aa7b5bfa20b",
      last_name: "Kowalski",
      phone_number: "+48123123123",
      username: "standard0",
    },
    employer: {
      company_address: {
        city: "Ten test i tak nie przejdzie",
        postal_code: "69-123",
        street: "string",
        street_number: "693",
      },
      company_name: "string",
      email: "string@aaa.aaa",
      first_name: "string",
      id: "e8ac8431-cc60-423d-a044-9d048285f2ee",
      last_name: "string",
      nip: "5555555555",
      phone_number: "+48123456789",
      username: "string",
    },
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "GET":
            switch (fetchUserType) {
              case userTypes.STANDARD:
                resolve({
                  status: 200,
                  json: () => Promise.resolve(apiUserDetails.standard),
                });
                break;
              case userTypes.EMPLOYER:
                resolve({
                  status: 200,
                  json: () => Promise.resolve(apiUserDetails.employer),
                });
                break;
              default:
                reject({});
                break;
            }
            break;
          case "POST":
            switch (postType) {
              case "Approve":
                resolve({
                  status: 200,
                  json: () =>
                    Promise.resolve({
                      message: "Użytkownik został pomyślnie zweryfikowany",
                    }),
                });
                break;
              case "Reject":
                resolve({
                  status: 200,
                  json: () =>
                    Promise.resolve({ message: "Konto odrzucone pomyślnie" }),
                });
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

  it("should match snapshot (Standard type user) ", async () => {
    failFetch = false;
    fetchUserType = userTypes.STANDARD;

    const { container, getByText } = render(
      <MemoryRouter>
        <UserToApprove user={user.standard} activeUser={user.standard.id} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("11-123 Warszawa"));
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot (Employer type user) ", async () => {
    failFetch = false;
    fetchUserType = userTypes.EMPLOYER;

    const { container, getByText } = render(
      <MemoryRouter>
        <UserToApprove user={user.employer} activeUser={user.employer.id} />
      </MemoryRouter>
    );
    await waitForElement(() =>
      getByText("69-123 Ten test i tak nie przejdzie")
    );
    expect(container).toMatchSnapshot();
  });

  it("should view alert at api fail", async () => {
    failFetch = true;
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserToApprove user={user.standard} activeUser={user.standard.id} />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() =>
      getByText("Nie udało się załadować danych użytkownika.")
    );
    expect(
      getByText("Nie udało się załadować danych użytkownika.")
    ).toBeInTheDocument();
    expect(queryByText("Jan")).not.toBeInTheDocument();
  });

  it("should accept user", async () => {
    failFetch = false;
    fetchUserType = userTypes.STANDARD;
    postType = "Approve";
    const { getByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserToApprove user={user.standard} activeUser={user.standard.id} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("11-123 Warszawa"));

    fireEvent.click(getByText("Akceptuj"));
    await wait(() => expect(contextA.showAlert).toHaveBeenCalled());
    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Użytkownik został pomyślnie zweryfikowany",
      "success"
    );
  });

  it("should reject user", async () => {
    failFetch = false;
    fetchUserType = userTypes.STANDARD;
    postType = "Reject";
    const { getByText, getByTestId } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserToApprove user={user.standard} activeUser={user.standard.id} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("11-123 Warszawa"));
    fireEvent.click(getByText("Odrzuć"));
    fireEvent.click(getByTestId("modal_confirm"));

    await wait(() => expect(contextA.showAlert).toHaveBeenCalled());
    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Konto odrzucone pomyślnie",
      "success"
    );
  });
});

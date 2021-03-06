import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserDetails from "./UserDetails";
import { userTypes } from "constants/userTypes";

describe("UserDetails", () => {
  let failFetch;
  let fetchUserType;

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
        city: "wololoo",
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
      });
    });
    global.check = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    failFetch = false;
  });

  it("should match snapshot - standard", async () => {
    fetchUserType = userTypes.STANDARD;
    const { container, getByText } = render(
      <MemoryRouter>
        <UserDetails users={[user.standard]} activeUser={user.standard.id} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Jan"));
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot - employer", async () => {
    fetchUserType = userTypes.EMPLOYER;
    const { container, getByText } = render(
      <MemoryRouter>
        <UserDetails users={[user.employer]} activeUser={user.employer.id} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("string@aaa.aaa"));
    expect(container).toMatchSnapshot();
  });

  it("should show standard user data", async () => {
    fetchUserType = userTypes.STANDARD;
    const { getByText } = render(
      <MemoryRouter>
        <UserDetails users={[user.standard]} activeUser={user.standard.id} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Jan"));
    expect(getByText("Aleja Niepodległości 20")).toBeInTheDocument();
  });

  it("should show employer user data", async () => {
    fetchUserType = userTypes.EMPLOYER;
    const { getByText } = render(
      <MemoryRouter>
        <UserDetails users={[user.employer]} activeUser={user.employer.id} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("69-123 wololoo"));
    expect(getByText("69-123 wololoo")).toBeInTheDocument();
  });

  it("should click on employer", async () => {
    fetchUserType = userTypes.EMPLOYER;
    const { getByText } = render(
      <MemoryRouter>
        <UserDetails
          users={[user.employer]}
          activeUser={""}
          setActiveUser={(e) => {
            check();
          }}
        />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("string (employer)"));
    fireEvent.click(getByText("string (employer)"));
    expect(check).toHaveBeenCalledTimes(1);
  });
});

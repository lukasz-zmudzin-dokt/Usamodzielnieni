import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserApprovalPage from "./UserApprovalPage";
import { AlertContext } from "context";
import { userTypes } from "constants/userTypes";

describe("UserApproval", () => {
  let failFetch;
  let contextA = {
    open: true,
    changeVisibility: jest.fn(),
    message: "abc",
    changeMessage: jest.fn(),
    showAlert: jest.fn(),
  };
  let apiUsers = {
    results: [
      {
        date_joined: "2020-04-25T23:31:59.239639+02:00",
        email: "qwe@qwe.vcb",
        id: "fcd32247-90ac-4394-92ca-27252bdc2ee9",
        last_login: "2020-04-25T23:31:59.239631+02:00",
        status: "Waiting for verification",
        type: userTypes.STANDARD,
        username: "testowyuser123",
      },
      {
        date_joined: "2019-04-25T23:31:59.239639+02:00",
        email: "qwe@qwe.vcb2",
        id: "fcd32247-90ac-4394-92ca-27252bdc2ee0",
        last_login: "2020-04-25T23:32:59.239631+02:00",
        status: "Waiting for verification",
        type: userTypes.EMPLOYER,
        username: "testowyuser1232",
      },
    ],
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 200, json: () => Promise.resolve(apiUsers) });
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserApprovalPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("testowyuser123 (standard)"));
    expect(container).toMatchSnapshot();
  });

  it("should load users", async () => {
    const { getByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserApprovalPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("testowyuser123 (standard)"));
    expect(getByText("testowyuser123 (standard)")).toBeInTheDocument();
  });

  it("should view alert at api fail", async () => {
    failFetch = true;
    const { getByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserApprovalPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Ups, wystąpił błąd."));
    expect(getByText("Ups, wystąpił błąd.")).toBeInTheDocument();
  });

  it("should view alert at api returning no users", async () => {
    apiUsers.results = [];
    const { getByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserApprovalPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("Brak kont do zatwierdzenia"));
    expect(getByText("Brak kont do zatwierdzenia")).toBeInTheDocument();
  });
});

import { render, waitForElement } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import UserList from "./UserList";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";

describe("UserList", () => {
  let users, failFetch, token;

  beforeAll(() => {
    token = 123;
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 200, json: () => Promise.resolve(users) });
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;

    users = {
      results: [
        {
          id: 1,
          username: "user1",
          date_joined: "2020-05-12",
          email: "qwe@qwe.qwe",
          type: userTypes.STANDARD,
          status: userStatuses.VERIFIED,
        },
        {
          id: 2,
          username: "user2",
          date_joined: "2020-05-11",
          email: "asd@asd.asd",
          type: userTypes.EMPLOYER,
          status: userStatuses.AWAITING,
        },
      ],
    };
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("user1"));

    expect(container).toMatchSnapshot();
  });

  it("should render alert error on failfetch", async () => {
    failFetch = true;
    const { getByText } = render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    expect(
      getByText("Ładowanie listy użytkowników...", { exact: false })
    ).toBeInTheDocument();
    await waitForElement(() => fetch);
    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
  });

  it("should render alert with no users", async () => {
    users.results = [];
    const { getByText } = render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    await waitForElement(() =>
      getByText("Brak użytkowników", { exact: false })
    );
    expect(
      getByText("Brak użytkowników", { exact: false })
    ).toBeInTheDocument();
  });
});

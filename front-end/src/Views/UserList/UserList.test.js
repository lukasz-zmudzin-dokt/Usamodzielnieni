import { render, waitForElement, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import UserList from "./UserList";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";
import UserInfo from "./components/UserInfo";

jest.mock("./components/UserInfo");

describe("UserList", () => {
  let users, failFetch;

  beforeAll(() => {
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
    jest.clearAllMocks();
    UserInfo.mockImplementation((props) => <div>{props.user.username}</div>);
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

  it("should remove user from list when deleteUser is called", async () => {
    UserInfo.mockImplementation(({ user, deleteUser }) => {
      return <button onClick={() => deleteUser(user)}>{user.username}</button>;
    });
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("user1"));

    fireEvent.click(getByText("user2"));

    expect(getByText("user1")).toBeInTheDocument();
    expect(queryByText("user2")).not.toBeInTheDocument();
  });

  it("should replace user when setUser is called", async () => {
    UserInfo.mockImplementation(({ user, setUser }) => {
      return (
        <button onClick={() => setUser({ ...user, username: "new_username" })}>
          {user.username}
        </button>
      );
    });
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("user1"));

    fireEvent.click(getByText("user2"));

    expect(getByText("user1")).toBeInTheDocument();
    expect(getByText("new_username")).toBeInTheDocument();
    expect(queryByText("user2")).not.toBeInTheDocument();
  });
});

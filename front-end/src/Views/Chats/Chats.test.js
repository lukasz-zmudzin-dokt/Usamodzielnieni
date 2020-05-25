import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, waitForElement } from "@testing-library/react";
import Chats from "./Chats";

jest.mock("./components", () => ({
  ChatInfo: ({ chat }) => <div>{chat.first.username}</div>,
}));
jest.mock("components", () => ({
  Pagination: () => <div>Pagination</div>,
}));

describe("Chats", () => {
  let failFetch = false;
  let apiChats = [];
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else if (init.method === "GET") {
          resolve({
            status: 200,
            json: () => Promise.resolve(apiChats),
          });
        } else {
          reject({});
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;
    apiChats = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: "12",
          first: { username: "xd", first_name: "czesiek", last_name: "xd" },
          second: { username: "xd2", first_name: "czesiek2", last_name: "xd2" },
          updated: "2020-05-25T19:22:37.720364+02:00",
        },
        {
          id: "13",
          first: { username: "xd1", first_name: "czesiek", last_name: "xd" },
          second: { username: "xd2", first_name: "czesiek2", last_name: "xd2" },
          updated: "2020-06-25T19:22:37.720364+02:00",
        },
      ],
    };
    jest.clearAllMocks();
  });

  it("should render without crashing", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <Chats />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("xd"));

    expect(container).toMatchSnapshot();
  });

  it("should render loading alert when component is waiting for api response", async () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <Chats />
      </MemoryRouter>
    );

    expect(
      getByText("Ładowanie wiadomości", { exact: false })
    ).toBeInTheDocument();
    expect(queryByText("xd")).not.toBeInTheDocument();
    await waitForElement(() => getByText("xd"));
  });

  it("should render error alert when api returns error", async () => {
    failFetch = true;
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <Chats />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Wystąpił błąd", { exact: false }));
    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
    expect(queryByText("xd")).not.toBeInTheDocument();
  });

  it("should render info alert when api returns empty list", async () => {
    apiChats = { count: 0, results: [] };
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <Chats />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Brak wiadomości", { exact: false }));
    expect(getByText("Brak wiadomości", { exact: false })).toBeInTheDocument();
    expect(queryByText("xd")).not.toBeInTheDocument();
  });
});

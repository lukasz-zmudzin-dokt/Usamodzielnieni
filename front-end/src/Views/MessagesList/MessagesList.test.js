import React from "react";
import { render, wait } from "@testing-library/react";
import MessagesList from "Views/MessagesList";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "abc",
  }),
}));

describe("OfferForm", () => {
  let failFetch = false;
  let apiMessages = [
    {
      content: "b",
      send: "11:55 12.03.2020",
      side: "left",
      id: 0,
    },
    {
      content: "a",
      send: "11:55 12.03.2020",
      side: "right",
      id: 1,
    },
  ];

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "GET":
            resolve({ status: 200, json: () => Promise.resolve(apiMessages) });
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;
    jest.clearAllMocks();
  });
  it("should renders correctly", async () => {
    const { container } = render(<MessagesList />);

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(container).toMatchSnapshot();
  });

  it("should renders [] if api fails", async () => {
    failFetch = true;
    const { queryByText } = render(<MessagesList />);

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(queryByText("b")).not.toBeInTheDocument();
  });
});

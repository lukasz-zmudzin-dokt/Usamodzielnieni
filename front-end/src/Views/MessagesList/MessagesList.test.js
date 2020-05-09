import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import MessagesList from "Views/MessagesList";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import {AlertContext} from 'context';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "abc",
  }),
}));

const renderWithRouter = (
  ui,
  {
    route = "/chats/12",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};

describe("MessagesList", () => {
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

  const alertC = {
    showAlert: jest.fn()
  }

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
  it("should match snapshot", async () => {
    const { container } = renderWithRouter(<MessagesList />);

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(container).toMatchSnapshot();
  });

  it("should renders [] if api fails", async () => {
    failFetch = true;
    const { queryByText } = renderWithRouter(<AlertContext.Provider value={alertC}><MessagesList /></AlertContext.Provider>);

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith("Nie udało się załadować wiadomości.")
    expect(queryByText("b")).not.toBeInTheDocument();
  });

  it("should redirect to /chats if you click close button", async () => {
    const { getByText, history } = renderWithRouter(<MessagesList />);
    expect(history.location.pathname).toEqual("/chats/12");
    fireEvent.click(getByText("<"));
    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual("/chats");
  });
});

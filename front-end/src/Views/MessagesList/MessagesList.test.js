import React from "react";
import {
  render,
  wait,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import MessagesList from "Views/MessagesList";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AlertContext, UserContext } from "context";

const WebSocket = require("websocket-driver");

global.WebSocket = WebSocket;

jest.mock("websocket-driver");

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
    ...render(
      <AlertContext.Provider value={{ showAlert: jest.fn() }}>
        <UserContext.Provider
          value={{
            data: { username: "standard1" },
          }}
        >
          <Router history={history}>{ui}</Router>
        </UserContext.Provider>
      </AlertContext.Provider>
    ),
    history,
  };
};

describe("MessagesList", () => {
  let user = {
    data: { username: "standard1" },
  };
  let failFetch = false;
  let apiMessages = [
    {
      message: "gitówa",
      timestamp: "2020-05-25T21:48:18.965719+02:00",
      user: {
        username: "standard1",
        first_name: "standard1",
        last_name: "standard1",
      },
    },
    {
      message: "gitówa2",
      timestamp: "2020-06-25T21:48:18.965719+02:00",
      user: {
        username: "standard2",
        first_name: "standard2",
        last_name: "standard2",
      },
    },
  ];

  const alertC = {
    showAlert: jest.fn(),
  };

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
    const { queryByText } = renderWithRouter(
      <AlertContext.Provider value={alertC}>
        <MessagesList />
      </AlertContext.Provider>
    );

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie udało się załadować wiadomości."
    );
    expect(queryByText("b")).not.toBeInTheDocument();
  });

  it("should redirect to /chats if you click close button", async () => {
    const { getByText, history } = renderWithRouter(<MessagesList />);
    expect(history.location.pathname).toEqual("/chats/12");
    fireEvent.click(getByText("<"));
    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual("/chats");
  });

  it("should renders [] if api fails", async () => {
    failFetch = true;
    const { queryByText } = renderWithRouter(
      <AlertContext.Provider value={alertC}>
        <MessagesList />
      </AlertContext.Provider>
    );

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie udało się załadować wiadomości."
    );
    expect(queryByText("b")).not.toBeInTheDocument();
  });

  it("should send message", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = renderWithRouter(
      <AlertContext.Provider value={alertC}>
        <MessagesList />
      </AlertContext.Provider>
    );

    fireEvent.change(getByPlaceholderText("Napisz wiadomość..."), {
      target: {
        value: "test",
      },
    });

    fireEvent.click(getByTestId("button"));

    await waitForElement(() => getByText("test"));

    // expect(alertC.showAlert).toHaveBeenCalledWith(
    //   "Nie udało się załadować wiadomości."
    // );
  });
});

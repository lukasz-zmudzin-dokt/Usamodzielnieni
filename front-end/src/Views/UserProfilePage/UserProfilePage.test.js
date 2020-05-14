import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import UserProfile from "Views/UserProfilePage/index.js";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserContext, AlertContext } from "context";
import { staffTypes } from "constants/staffTypes";

const renderWithRouter = (
  type,
  ui,
  {
    route = "/user",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = { type: "Staff", data: { group_type: type }, token: 123 };
  let contextA = {
    open: true,
    changeVisibility: jest.fn(),
    message: "abc",
    changeMessage: jest.fn(),
    showAlert: jest.fn(),
  };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <Router history={history}>{ui}</Router>
        </AlertContext.Provider>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("UserProfile", () => {
  let user = {
    id: 123,
    first_name: "Jan",
    last_name: "Kowalski",
    username: "jankowalski",
    email: "hello@world.com",
  };
  let apiFail;
  let contextA;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({ status: 200, json: Promise.resolve(user) });
              break;
            default:
              reject({});
              break;
          }
        }
      });
    });
  });

  beforeEach(() => {
    apiFail = false;
    contextA = {
      open: true,
      changeVisibility: jest.fn(),
      message: "abc",
      changeMessage: jest.fn(),
      showAlert: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserProfile />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render alert on api fail", async () => {
    apiFail = true;
    const { queryByText, getByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <UserProfile />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Wystąpił błąd podczas pobierania"));

    expect(getByText("Wystąpił błąd podczas pobierania")).toBeInTheDocument();

    expect(queryByText("Jan", { exact: false })).not.toBeInTheDocument();
  });

  it("should render register button for staff reg", () => {
    const { history, getByText } = renderWithRouter(
      staffTypes.VERIFICATION,
      <UserProfile />
    );

    expect(getByText("Zarejestruj administratora")).toBeInTheDocument();

    fireEvent.click(getByText("Zarejestruj administratora"));

    expect(history.location.pathname).toBe("/newAccount/staff", {
      exact: false,
    });
  });

  it("should render cv button for staff cv", () => {
    const { history, getByText } = renderWithRouter(
      staffTypes.CV,
      <UserProfile />
    );

    expect(getByText("Zobacz CV do akceptacji")).toBeInTheDocument();

    fireEvent.click(getByText("Zobacz CV do akceptacji"));

    expect(history.location.pathname).toBe("/cvApproval", { exact: false });
  });
});

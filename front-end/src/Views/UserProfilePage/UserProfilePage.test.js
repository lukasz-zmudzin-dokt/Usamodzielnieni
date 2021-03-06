import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import UserProfile from "Views/UserProfilePage/index.js";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserContext, AlertContext } from "context";
import { staffTypes } from "constants/staffTypes";
import { userTypes } from "constants/userTypes";
import UserBasicInfo from "./components/UserBasicInfo";

jest.mock("./components/UserBasicInfo");

const renderWithRouter = (
  type,
  ui,
  {
    route = "/user",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let contextA = {
    open: true,
    changeVisibility: jest.fn(),
    message: "abc",
    changeMessage: jest.fn(),
    showAlert: jest.fn(),
  };
  let context = {
    type: userTypes.STAFF,
    data: { group_type: [type] },
    token: 123,
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
    UserBasicInfo.mockImplementation(() => <div>UserBasicInfo</div>);
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

  it("should render user list button", () => {
    const { history, getByText } = renderWithRouter(
      staffTypes.CV,
      <UserProfile />
    );

    expect(
      getByText("Zobacz listę wszystkich użytkowników")
    ).toBeInTheDocument();

    fireEvent.click(getByText("Zobacz listę wszystkich użytkowników"));

    expect(history.location.pathname).toBe("/userList", { exact: false });
  });

  it("should render no buttons", () => {
    const { queryByText } = render(
      <UserContext.Provider value={{ type: "Standard" }}>
        <MemoryRouter>
          <UserProfile />
        </MemoryRouter>
      </UserContext.Provider>
    );

    expect(
      queryByText("Zobacz listę wszystkich użytkowników")
    ).not.toBeInTheDocument();
    expect(queryByText("Zarejestruj administratora")).not.toBeInTheDocument();
    expect(queryByText("Zobacz CV do akceptacji")).not.toBeInTheDocument();
  });
});

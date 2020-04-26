import React from "react";
import {fireEvent, render, waitForElement} from "@testing-library/react";
import UserProfile from "Views/UserProfilePage/index.js";
import {MemoryRouter, Router} from "react-router-dom";
import {createMemoryHistory} from 'history';
import {UserContext} from "context/UserContext";

const renderWithRouter = (
    ui,
    {
      route = "/user",
      history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) => {
  let context = { type: 'Staff', token: 123 };
  return {
    ...render(
        <UserContext.Provider value={context}>
          <Router history={history}>{ui}</Router>
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
    email: "hello@world.com"
  };
  let apiFail;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiFail) {
          resolve({status: 500});
        } else {
          switch(init.method) {
            case "GET":
              resolve({status: 200, json: Promise.resolve(user)});
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
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const {container} = render(
        <MemoryRouter>
          <UserProfile/>
        </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render alert on api fail', async () => {
    apiFail = true;
    const {getByText} = render(
        <MemoryRouter>
          <UserProfile/>
        </MemoryRouter>
    );

    await waitForElement(() => getByText("Wystąpił błąd", {exact: false}));

    expect(getByText("Wystąpił błąd", {exact: false})).toBeInTheDocument();
  });

  it('should render register button for staff', () => {
    const {history, getByText} = renderWithRouter(
        <UserProfile/>
    );

    expect(getByText('Zarejestruj administratora')).toBeInTheDocument();

    fireEvent.click(getByText('Zarejestruj administratora'));

    expect(history.location.pathname).toBe("/newAccount/staff", {exact: false})
  });
});
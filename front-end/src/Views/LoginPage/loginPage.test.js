import React from "react";
import { fireEvent, render } from "@testing-library/react";
import LoginPage from "Views/LoginPage/index.js";

import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "context";
import { getByTestId, getByText, waitForElement } from "@testing-library/react";
import LoginForm from "./components/loginForm";

describe("LoginPageTest", () => {
  let credentials;
  let apiFail;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiFail) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "POST":
            resolve({ status: 200 });
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });

  beforeEach(() => {
    apiFail = false;
    credentials = {
      username: "qweqwe",
      password: "123123",
    };
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <UserProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should load error message", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <UserProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserProvider>
    );

    fireEvent.change(getByPlaceholderText("Login", { exact: false }), {
      target: { value: "qweqwe" },
    });
    fireEvent.change(getByPlaceholderText("Hasło", { exact: false }), {
      target: { value: "qweqwe" },
    });

    fireEvent.click(getByTestId("loginBtn"));
    await waitForElement(() => getByTestId("login_msgFail", { exact: false }));
    expect(getByTestId("login_msgFail", { exact: false })).toBeInTheDocument();
  });

  it("should call setRedirect method", async () => {
    const { component, getByTestId } = render(
      <UserProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserProvider>
    );

    let onBlur = (data) => component.setState({ data });

    const { child } = render(<LoginForm data={credentials} onBlur={onBlur} />);

    fireEvent.change(getByTestId(child, "loginPage_login", { exact: false }), {
      target: { value: "staff1" },
    });
    fireEvent.change(
      getByTestId(child, "loginPage_password", { exact: false }),
      {
        target: { value: "staff1" },
      }
    );

    fireEvent.click(component, getByTestId("loginBtn", { exact: false }));
    await waitForElement(() => component.renderRedirect());

    expect(component.renderRedirect()).toHaveBeenCalled();
  });

  it("should render alert when api fails", async () => {
    apiFail = true;
    const state = {
      credentials: credentials,
      validated: false,
      incorrect: false,
    };

    const { getByTestId, getByText } = render(
      <UserProvider>
        <MemoryRouter>
          <LoginPage state={state} />
        </MemoryRouter>
      </UserProvider>
    );

    const handleIncorrectResponse = jest.fn(500);

    const msgFail = "Błąd serwera.";

    fireEvent.click(getByTestId("loginBtn", { exact: false }));
    await waitForElement(() => getByText(msgFail, { exact: false }));

    expect(handleIncorrectResponse).toHaveBeenCalled();
    expect(msgFail).toBeInTheDocument();
  });
});

import NewPasswordPage from "./NewPasswordPage";
import React from "react";
import { Router } from "react-router-dom";
import { fireEvent, render, wait } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { AlertContext } from "context";

const renderWithRouter = (
  ui,
  context,
  {
    route = "/newPassword/1",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(
      <AlertContext.Provider value={context}>
        <Router history={history}>{ui}</Router>
      </AlertContext.Provider>
    ),
    history,
  };
};

describe("NewPasswordPage", () => {
  let apiFail;
  let alertC = {
    showAlert: jest.fn(),
  };
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 200, json: () => Promise.resolve("hasło ok") });
        }
      });
    });
  });

  beforeEach(() => {
    apiFail = false;
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    const { container } = renderWithRouter(<NewPasswordPage />);

    expect(container).toMatchSnapshot();
  });

  it("should render message on non matching password", async () => {
    const { getByPlaceholderText, getByText } = renderWithRouter(
      <NewPasswordPage />,
      alertC
    );

    fireEvent.change(getByPlaceholderText("Nowe hasło"), {
      target: { value: "qweqweqwe" },
    });
    fireEvent.change(getByPlaceholderText("Powtórz hasło"), {
      target: { value: "asdasdasd" },
    });

    fireEvent.click(getByText("Wyślij"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith("Hasła się nie zgadzają");
  });

  it("should render alert on api fail", async () => {
    apiFail = true;
    const { getByPlaceholderText, getByText } = renderWithRouter(
      <NewPasswordPage />,
      alertC
    );

    fireEvent.change(getByPlaceholderText("Nowe hasło"), {
      target: { value: "qweqweqwe" },
    });
    fireEvent.change(getByPlaceholderText("Powtórz hasło"), {
      target: { value: "qweqweqwe" },
    });

    fireEvent.click(getByText("Wyślij"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Coś poszło nie tak. Upewnij się, że Twój token nie wygasł."
    );
  });

  it("should render alert on success and redirect", async () => {
    const { getByPlaceholderText, getByText } = renderWithRouter(
      <NewPasswordPage />,
      alertC
    );

    fireEvent.change(getByPlaceholderText("Nowe hasło"), {
      target: { value: "qweqweqwe" },
    });
    fireEvent.change(getByPlaceholderText("Powtórz hasło"), {
      target: { value: "qweqweqwe" },
    });

    fireEvent.click(getByText("Wyślij"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Hasło zostało zmienione. Przekierowuję..."
    );
    //await expect(history.location.pathname).toBe("/login");
  });
});

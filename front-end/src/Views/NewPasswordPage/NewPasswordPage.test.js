import NewPasswordPage from "./NewPasswordPage";
import React from "react";
import { Router } from "react-router-dom";
import { waitForElement, fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";

const renderWithRouter = (
  ui,
  {
    route = "/newPassword/1",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};

describe("NewPasswordPage", () => {
  let apiFail;

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

  it("should should render message on non matching password", () => {
    const { getByPlaceholderText, getByText } = renderWithRouter(
      <NewPasswordPage />
    );

    fireEvent.change(getByPlaceholderText("Nowe hasło"), {
      target: { value: "qweqweqwe" },
    });
    fireEvent.change(getByPlaceholderText("Powtórz hasło"), {
      target: { value: "asdasdasd" },
    });

    fireEvent.click(getByText("Wyślij"));
    expect(getByText("Hasła się nie zgadzają")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it("should render alert on api fail", async () => {
    apiFail = true;
    const { getByPlaceholderText, getByText } = renderWithRouter(
      <NewPasswordPage />
    );

    fireEvent.change(getByPlaceholderText("Nowe hasło"), {
      target: { value: "qweqweqwe" },
    });
    fireEvent.change(getByPlaceholderText("Powtórz hasło"), {
      target: { value: "qweqweqwe" },
    });

    fireEvent.click(getByText("Wyślij"));
    await waitForElement(() =>
      getByText("Coś poszło nie tak", { exact: false })
    );
    expect(
      getByText("Coś poszło nie tak", { exact: false })
    ).toBeInTheDocument();
  });

  it("should render alert on success and redirect", async () => {
    const { history, getByPlaceholderText, getByText } = renderWithRouter(
      <NewPasswordPage />
    );

    fireEvent.change(getByPlaceholderText("Nowe hasło"), {
      target: { value: "qweqweqwe" },
    });
    fireEvent.change(getByPlaceholderText("Powtórz hasło"), {
      target: { value: "qweqweqwe" },
    });

    fireEvent.click(getByText("Wyślij"));
    await waitForElement(() =>
      getByText("Hasło zostało zmienione", { exact: false })
    );
    expect(
      getByText("Hasło zostało zmienione", { exact: false })
    ).toBeInTheDocument();
    //await expect(history.location.pathname).toBe("/login");
  });
});

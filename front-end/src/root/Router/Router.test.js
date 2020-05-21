import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Router from "root/Router";
import { MemoryRouter, Router as RouterDOM } from "react-router-dom";
import { UserContext, AlertContext } from "context";

const renderWithRouter = (
  ui,
  context,
  contextA,
  {
    route = "/logina",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <RouterDOM history={history}>{ui}</RouterDOM>
        </AlertContext.Provider>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("Router test", () => {
  let context = {
    token: "abc",
  };

  let alertC = {
    showAlert: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Router></Router>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  it("full app rendering/navigating(dashboard)", () => {
    const history = createMemoryHistory();
    history.push("/");
    const { getByText } = render(
      <MemoryRouter>
        <Router></Router>
      </MemoryRouter>
    );

    expect(getByText("Utwórz konto")).toBeInTheDocument();
  });

  it("full app rendering/navigating(register)", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/newAccount"]}>
        <Router></Router>
      </MemoryRouter>
    );

    expect(getByText("Rejestracja")).toBeInTheDocument();
  });

  it("full app rendering/navigating(login)", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Router></Router>
      </MemoryRouter>
    );

    expect(getByText("Logowanie")).toBeInTheDocument();
  });

  it("should redirect if route didn't exist(with token)", () => {
    renderWithRouter(<Router></Router>, context, alertC);

    expect(alertC.showAlert).toHaveBeenCalled();
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie ma takiej strony. Nastąpiło przekierowanie do twojego profilu."
    );
  });

  it("should redirect if route didn't exist(without token)", () => {
    context = {};
    renderWithRouter(<Router></Router>, context, alertC);

    expect(alertC.showAlert).toHaveBeenCalled();
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie ma takiej strony. Nastąpiło przekierowanie do strony głównej."
    );
  });
});

import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Router from "root/Router";
import { MemoryRouter } from "react-router-dom";

describe("Router test", () => {
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
});

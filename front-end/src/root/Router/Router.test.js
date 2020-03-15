import React from "react";
import { render } from "@testing-library/react";
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
});

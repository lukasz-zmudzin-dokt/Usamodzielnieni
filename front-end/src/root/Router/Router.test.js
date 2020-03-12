import React from "react";
import { render } from "@testing-library/react";
import Router from "root/Router";

import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "context";

describe("Router test", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <UserProvider>
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

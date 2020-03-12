import React from "react";
import { render } from "@testing-library/react";
import PrivateRoute from "root/_components/PrivateRoute";

import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "context";

describe("PrivateRoute test", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <UserProvider>
        <Router>
          <PrivateRoute redirect="/home" />
        </Router>
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

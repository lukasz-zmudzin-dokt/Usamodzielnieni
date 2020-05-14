import React from "react";
import LoginForm from "./loginForm";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { UserProvider } from "context/UserContext";

describe("LoginForm", () => {
  it("should render correctly", () => {
    const data = {
      username: "qweqwe",
      password: "123123",
    };

    const onBlur = jest.fn();

    const { container } = render(
      <UserProvider>
        <MemoryRouter>
          <LoginForm data={data} onBlur={onBlur} />
        </MemoryRouter>
      </UserProvider>
    );

    expect(container).toMatchSnapshot();
  });
});

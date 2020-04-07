import React from "react";
import { render } from "@testing-library/react";
import UserProfile from "Views/UserProfilePage/index.js";

describe("UserProfile", () => {
  it("should render without crashing", () => {
    render(<UserProfile />);
  });
});

it("should render correctly", () => {
  const { container } = render(
    <UserProfile />
  );
  expect(container).toMatchSnapshot();
});

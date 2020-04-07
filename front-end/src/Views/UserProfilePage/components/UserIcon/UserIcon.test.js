import React from "react";
import { render } from "@testing-library/react";
import UserIcon from "Views/UserProfilePage/components/UserIcon";

describe("UserIcon ", () => {
  it("should render without crashing", () => {
    render(<UserIcon />);
  });
});

it("should render correctly", () => {
  const { container } = render(
    <UserIcon />
  );
  expect(container).toMatchSnapshot();
});
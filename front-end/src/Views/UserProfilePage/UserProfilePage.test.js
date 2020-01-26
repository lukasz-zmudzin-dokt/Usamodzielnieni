import React from "react";
import { render } from "@testing-library/react";
import UserProfile from "Views/UserProfilePage/index.js";
import renderer from "react-test-renderer";

describe("UserProfile", () => {
  it("should render without crashing", () => {
    render(<UserProfile />);
  });
});

it("renders correctly", () => {
  const mainComponent = renderer.create(<UserProfile />).toJSON();
  expect(mainComponent).toMatchSnapshot();
});

import React from "react";
import { render } from "@testing-library/react";
import UserIcon from "Views/UserProfilePage/components/UserIcon";
import renderer from "react-test-renderer";

describe("UserIcon ", () => {
  it("should render without crashing", () => {
    render(<UserIcon />);
  });
});

it("renders correctly", () => {
  const mainComponent = renderer.create(<UserIcon />).toJSON();
  expect(mainComponent).toMatchSnapshot();
});

import React from "react";
import { render } from "@testing-library/react";
import Menu from "./Menu";
import { MainPhoto, TvContainer, TilesContainer } from "./components";

jest.mock("./components");

describe("Menu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    MainPhoto.mockImplementation(() => <div>MainPhoto</div>);
    TvContainer.mockImplementation(() => <div>TvContainer</div>);
    TilesContainer.mockImplementation(() => <div>TilesContainer</div>);
  });

  it("should render without crashing", () => {
    const { container } = render(<Menu />);
    expect(container).toMatchSnapshot();
  });
});

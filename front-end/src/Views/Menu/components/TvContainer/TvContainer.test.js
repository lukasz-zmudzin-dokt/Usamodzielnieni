import React from "react";
import { render } from "@testing-library/react";
import TvContainer from "./TvContainer";

describe("TvContainer", () => {
  it("should render without crashing", () => {
    const { container } = render(<TvContainer />);
    expect(container).toMatchSnapshot();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import MainPhoto from "./MainPhoto";

describe("MainPhoto", () => {
  it("should render without crashing", () => {
    const { container } = render(<MainPhoto />);
    expect(container).toMatchSnapshot();
  });
});

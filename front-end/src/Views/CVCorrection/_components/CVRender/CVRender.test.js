import React from "react";
import { render } from "@testing-library/react";
import CVRender from "./CVRender";

describe("CVRender", () => {
  it("should match snapshot", () => {
    const { container } = render(<CVRender />);
    expect(container).toMatchSnapshot();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import Steps from "./Steps";
import { ProgressBar } from "./components";

jest.mock("./components");

describe("Steps", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ProgressBar.mockImplementation(() => <div>ProgressBar</div>);
  });

  it("should render without crashing", async () => {
    const { container } = render(<Steps />);

    expect(container).toMatchSnapshot();
  });
});

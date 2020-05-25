import React from "react";
import { render } from "@testing-library/react";
import TvContainer from "./TvContainer";
import { VideoField } from "components";

jest.mock("components");

describe("TvContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    VideoField.mockImplementation(() => <div>VideoField</div>);
  });

  it("should render without crashing", () => {
    const { container } = render(<TvContainer />);
    expect(container).toMatchSnapshot();
  });
});

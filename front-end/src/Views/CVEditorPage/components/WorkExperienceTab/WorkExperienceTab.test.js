import React from "react";
import { render } from "@testing-library/react";
import WorkExperienceTab from "./WorkExperienceTab";

describe("WorkExperienceTab", () => {
  let props;
  beforeEach(() => {
    props = {
      data: [],
      onChange: () => {},
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<WorkExperienceTab {...props} />);

    expect(container).toMatchSnapshot();
  });
});

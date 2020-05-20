import React from "react";
import { render } from "@testing-library/react";
import Bullet from "./Bullet";

describe("Bullet", () => {
  let props;

  beforeEach(() => {
    props = {
      step: {
        type: "main",
        title: "Tytuł kroku",
      },
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<Bullet {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render without crashing when step type is sub", () => {
    props.step.type = "sub";
    const { container } = render(<Bullet {...props} />);
    expect(container).toMatchSnapshot();
  });
});

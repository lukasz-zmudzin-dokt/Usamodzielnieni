import React from "react";
import { render } from "@testing-library/react";
import ProgressBarFragment from "./ProgressBarFragment";
import { Bullet, StepInfo } from "../";

jest.mock("../");

describe("ProgressBarFragment", () => {
  let props;

  beforeEach(() => {
    jest.clearAllMocks();
    Bullet.mockImplementation(() => <div>Bullet</div>);
    StepInfo.mockImplementation(() => <div>StepInfo</div>);
    props = {
      step: {},
      current: true,
      setCurrent: jest.fn(),
    };
  });

  it("should render without crashing", async () => {
    const { container } = render(<ProgressBarFragment {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should render without crashing when current is false and step is defined", async () => {
    props.current = false;
    const { container } = render(<ProgressBarFragment {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should render without crashing when current is false and step is undefined", async () => {
    props.current = false;
    props.step = undefined;
    const { container } = render(<ProgressBarFragment {...props} />);

    expect(container).toMatchSnapshot();
  });
});

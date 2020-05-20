import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StepInfo from "./StepInfo";

describe("StepInfo", () => {
  let props;

  beforeEach(() => {
    props = {
      step: {
        value: "Opis",
        next: [
          { id: "S001", choiceName: "Tak" },
          { id: "S002", choiceName: "Nie" },
        ],
      },
      setCurrent: jest.fn(),
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<StepInfo {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render without buttons when next is undefined", () => {
    props.next = undefined;
    const { container } = render(<StepInfo {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should set next step as current when button is clicked", () => {
    const { getByText } = render(<StepInfo {...props} />);

    fireEvent.click(getByText("Nie"));

    expect(props.setCurrent).toHaveBeenCalledWith("S002");
  });
});

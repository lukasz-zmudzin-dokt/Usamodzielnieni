import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Items from "./Items";

describe("Items", () => {
  let props;
  beforeEach(() => {
    props = {
      items: [
        { a: "a1", b: "b1" },
        { a: "a2", b: "b2" },
      ],
      onCutClick: () => {},
      getItemId: (item) => item.a,
      getItemName: (item) => item.b,
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<Items {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should call onCutClick function when item is clicked", () => {
    props.onCutClick = jest.fn();
    const { getByText } = render(<Items {...props} />);

    fireEvent.click(getByText("b1", { exact: false }));
    expect(props.onCutClick).toHaveBeenCalledTimes(1);
  });
});

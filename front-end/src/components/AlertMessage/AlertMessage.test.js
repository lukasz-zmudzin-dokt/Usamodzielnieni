import React from "react";
import { render,fireEvent} from "@testing-library/react";
import { AlertMessage } from "components";

describe("AlertMessage", () => {
  let props = {
    message: "abc",
    variant: "danger",
    handleClose: jest.fn().mockImplementation(() => false),
  };

  it("should match snapshot", () => {
    const { container } = render(<AlertMessage {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should close when close button is clicked", () => {
    const { getByText } = render(<AlertMessage {...props} />);

    fireEvent.click(getByText("×"));
    expect(props.handleClose).toHaveBeenCalled();
    expect(props.handleClose).toHaveBeenCalledWith(false);
  });
});

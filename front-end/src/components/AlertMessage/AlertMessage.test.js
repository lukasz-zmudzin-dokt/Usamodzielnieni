import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { AlertMessage } from "components";
import { MemoryRouter } from "react-router-dom";

describe("AlertMessage", () => {
  let props = {
    message: "abc",
    open: true,
    handleClose: jest.fn().mockImplementation(() => false),
  };
  it("should match snapshot", () => {
    const { container } = render(<AlertMessage {...props} />);
    expect(container).toMatchSnapshot();
  });
});

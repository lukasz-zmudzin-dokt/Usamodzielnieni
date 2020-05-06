import React from "react";
import { render } from "@testing-library/react";
import PaginationCV from "./PaginationCV";

describe("PaginationCV", () => {
  const props = {
    pages: 3,
    setActivePage: jest.fn(),
    activePage: 1,
  };
  it("should match snapshot", () => {
    const { container } = render(<PaginationCV {...props} />);

    expect(container).toMatchSnapshot();
  });
});

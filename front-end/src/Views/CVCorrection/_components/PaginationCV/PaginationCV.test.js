import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
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

  it("should change active page after click", async () => {
    const { getByText } = render(<PaginationCV {...props} />);

    [
      getByText("Next"),
      getByText("Last"),
      getByText("2"),
      getByText("3"),
    ].forEach((btn) => {
      expect(btn).toBeInTheDocument();
      expect(btn.closest("a")).toBeInTheDocument();
    });

    expect(getByText("1").textContent).toBe("1(current)");
    fireEvent.click(getByText("2"));
    await wait(() => expect(getByText("2").textContent).toBe("2(current)"));
  });
});

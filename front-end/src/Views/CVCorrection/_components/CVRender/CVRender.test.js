import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CVRender from "./CVRender";

jest.mock("react-pdf", () => ({
  pdfjs: { GlobalWorkerOptions: { workerSrc: "abc" } },
  Document: ({ onLoadSuccess = (pdf = { numPages: 4 }) => pdf.numPages }) => {
    return <div>{onLoadSuccess({ numPages: 4 })}</div>;
  },
  Outline: null,
  Page: () => <div>def</div>,
}));

describe("CVRender", () => {
  it("should match snapshot", () => {
    const { container } = render(<CVRender />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot", () => {
    const { container } = render(<CVRender />);
    expect(container).toMatchSnapshot();
  });
  describe("PaginationCV", () => {
    it("should change active page after click(1->2)", async () => {
      const { getByText } = render(<CVRender />);

      // [
      //   getByText("Next"),
      //   getByText("Last"),
      //   getByText("2"),
      //   getByText("3"),
      //   getByText("4"),
      // ].forEach((btn) => {
      //   expect(btn).toBeInTheDocument();
      //   expect(btn.closest("a")).toBeInTheDocument();
      // });

      expect(getByText("1").textContent).toBe("1(current)");
      fireEvent.click(getByText("2"));
      expect(getByText("2").textContent).toBe("2(current)");
    });
    it("should change active page after click(3->first)", () => {
      const { getByText } = render(<CVRender />);
      fireEvent.click(getByText("3"));
      expect(getByText("3").textContent).toBe("3(current)");
      fireEvent.click(getByText("First"));
      expect(getByText("1").textContent).toBe("1(current)");
    });
    it("should change active page after click(1->Last)", async () => {
      const { getByText } = render(<CVRender />);
      fireEvent.click(getByText("Last"));
      expect(getByText("4").textContent).toBe("4(current)");
    });
    it("should change active page after click(1->Next->Previous)", async () => {
      const { getByText } = render(<CVRender />);
      expect(getByText("1").textContent).toBe("1(current)");
      fireEvent.click(getByText("Next"));
      expect(getByText("2").textContent).toBe("2(current)");
      fireEvent.click(getByText("Previous"));
      expect(getByText("1").textContent).toBe("1(current)");
    });
  });
});

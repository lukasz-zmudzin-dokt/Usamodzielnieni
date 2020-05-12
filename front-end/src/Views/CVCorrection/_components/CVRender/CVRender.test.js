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
    const { container } = render(<CVRender url="/abc" />);
    expect(container).toMatchSnapshot();
  });

  describe("PaginationCV", () => {
    it("should change active page after click(1->2)", async () => {
      const { getByText } = render(<CVRender url="/abc" />);
      expect(getByText("1").textContent).toBe("1(current)");
      fireEvent.click(getByText("2"));
      expect(getByText("2").textContent).toBe("2(current)");
    });

    it("should change active page after click(3->first)", () => {
      const { getByText } = render(<CVRender url="/abc" />);
      fireEvent.click(getByText("3"));
      expect(getByText("3").textContent).toBe("3(current)");
      fireEvent.click(getByText("First"));
      expect(getByText("1").textContent).toBe("1(current)");
    });

    it("should change active page after click(1->Last)", async () => {
      const { getByText } = render(<CVRender url="/abc" />);
      fireEvent.click(getByText("Last"));
      expect(getByText("4").textContent).toBe("4(current)");
    });

    it("should change active page after click(1->Next->Previous)", async () => {
      const { getByText } = render(<CVRender url="/abc" />);
      expect(getByText("1").textContent).toBe("1(current)");
      fireEvent.click(getByText("Next"));
      expect(getByText("2").textContent).toBe("2(current)");
      fireEvent.click(getByText("Previous"));
      expect(getByText("1").textContent).toBe("1(current)");
    });

    it("should render redirect link if url is passed", async () => {
      const { getByText } = render(<CVRender url="/abc" />);

      expect(getByText("Lub pobierz CV z tego linku")).toBeInTheDocument();
    });

    it("should not render redirect link if url isn't passed", async () => {
      const { queryByText } = render(<CVRender url="" />);

      expect(
        queryByText("Lub pobierz CV z tego linku")
      ).not.toBeInTheDocument();
    });
  });
});

import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from "@testing-library/react";
import CorrectionForm from "./CorrectionForm";

describe("CorrectionForm", () => {
  let data = { id: "abc", token: "abc" };
  it("should match snapshot", () => {
    const { container } = render(<CorrectionForm data={data} />);
    expect(container).toMatchSnapshot();
  });
});

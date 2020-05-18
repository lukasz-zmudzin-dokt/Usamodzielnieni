import React from "react";
import { render, waitForElement } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should match snapshot", async () => {
    const { container, getByText } = render(<Footer />);
    await waitForElement(() => getByText("instagram"));
    expect(container).toMatchSnapshot();
  });
});

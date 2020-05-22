import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Contact from "./Contact";

describe("Contact", () => {
  it("should render without crashing", () => {
    const contact_example = {
      first_name: "imie",
      id: "1234",
    };
    const { getByText } = render(
      <Contact first_name={contact_example.first_name} />
    );
    expect(getByText("imie", { exact: false })).toBeInTheDocument();
  });

  it("should match snapshot", async () => {
    const { container } = render(<Contact />);
    expect(container).toMatchSnapshot();
  });
});

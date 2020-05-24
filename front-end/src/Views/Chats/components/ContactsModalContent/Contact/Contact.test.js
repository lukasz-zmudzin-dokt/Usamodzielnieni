import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Contact from "./Contact";

describe("Contact", () => {
  const contact = {
    first_name: "imie",
    last_name: "nazwisko",
    id: "1234",
    role: "gościu",
  };
  it("should render without crashing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Contact contact={contact} />
      </MemoryRouter>
    );
    expect(getByText("imie", { exact: false })).toBeInTheDocument();
  });

  it("should match snapshot", async () => {
    const { container } = render(
      <MemoryRouter>
        <Contact contact={contact} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});

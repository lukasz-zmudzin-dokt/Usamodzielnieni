import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import PhoneCard from "./PhoneCard";

describe("PhoneCard", () => {
  const contact = {
    name: "abc_name",
    number: "123456789",
  };

  global.document.execCommand = jest.fn();

  it("should render without crashing", () => {
    const { getByText } = render(
      <PhoneCard name={contact.name} number={contact.number} />
    );
    expect(getByText("abc_name", { exact: false })).toBeInTheDocument();
    expect(getByText("123456789", { exact: false })).toBeInTheDocument();
  });

  it("should match snapshot", async () => {
    const { container } = render(<PhoneCard />);
    expect(container).toMatchSnapshot();
  });

  it("should copy text on click", async () => {
    const { getByText } = render(
      <PhoneCard name={contact.name} number={contact.number} />
    );
    fireEvent.click(getByText("Skopiuj ten numer"));
    expect(getByText("Skopiowano")).toBeInTheDocument();

    await waitForElement(() => getByText("Skopiuj ten numer"));
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});

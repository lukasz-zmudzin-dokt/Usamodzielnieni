import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LanguagesTab from "./LanguagesTab";

describe("LanguagesTab", () => {
  let props;
  beforeEach(() => {
    props = {
      data: [],
      onChange: () => {},
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<LanguagesTab {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should call handleNameChange function when text input value change", async () => {
    const { getByLabelText } = render(<LanguagesTab {...props} />);

    fireEvent.change(getByLabelText("Język", { exact: false }), {
      target: { value: "angielski" },
    });
    expect(getByLabelText("Język", { exact: false }).value).toBe("angielski");
  });

  it("should call handleLevelChange function when select input value change", async () => {
    const { getByLabelText } = render(<LanguagesTab {...props} />);

    fireEvent.change(getByLabelText("Poziom", { exact: false }), {
      target: { value: "A1" },
    });
    expect(getByLabelText("Poziom", { exact: false }).value).toBe("A1");
  });

  it("should add action item to list", () => {
    props.data = [
      {
        name: "angielski",
        level: "A1",
      },
    ];
    const { getByText } = render(<LanguagesTab {...props} />);

    expect(getByText("angielski - A1", { exact: false })).toBeInTheDocument();
  });

  it("should clear input and set select to default value when add buttons is clicked", async () => {
    const { getByLabelText, getByText } = render(<LanguagesTab {...props} />);

    fireEvent.change(getByLabelText("Język", { exact: false }), {
      target: { value: "angielski" },
    });
    fireEvent.change(getByLabelText("Poziom", { exact: false }), {
      target: { value: "B1" },
    });
    fireEvent.click(getByText("Dodaj", { exact: false }));

    expect(getByLabelText("Język", { exact: false }).value).toBe("");
    expect(getByLabelText("Poziom", { exact: false }).value).toBe("A1");
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SkillsTab from "./SkillsTab";

describe("SkillsTab", () => {
  let props;
  beforeEach(() => {
    props = {
      data: [],
      onChange: () => {},
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<SkillsTab {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should call onNameChange function when text input value change", async () => {
    const { getByLabelText } = render(<SkillsTab {...props} />);

    fireEvent.change(getByLabelText("Umiejętność", { exact: false }), {
      target: { value: "Nazwa umiejętności" },
    });
    expect(getByLabelText("Umiejętność", { exact: false }).value).toBe(
      "Nazwa umiejętności"
    );
  });

  it("should add action item to list", () => {
    props.data = [{ name: "Nazwa mojej umiejętności" }];
    const { getByText } = render(<SkillsTab {...props} />);

    expect(
      getByText("Nazwa mojej umiejętności", { exact: false })
    ).toBeInTheDocument();
  });

  it("should clear input when add buttons is clicked", async () => {
    const { getByLabelText, getByText } = render(<SkillsTab {...props} />);

    fireEvent.change(getByLabelText("Umiejętność", { exact: false }), {
      target: { value: "Nazwa mojej umiejętności" },
    });
    fireEvent.click(getByText("Dodaj", { exact: false }));

    expect(getByLabelText("Umiejętność", { exact: false }).value).toBe("");
  });
});

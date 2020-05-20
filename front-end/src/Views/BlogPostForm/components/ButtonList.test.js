import React from "react";
import ButtonList from "./ButtonList";
import { render, fireEvent } from "@testing-library/react";

describe("ButtonList", () => {
  let array;
  let cutItem;

  beforeEach(() => {
    array = ["tag1", "tag2"];
    cutItem = () => {};
  });

  it("should render correctly", () => {
    const { container } = render(
      <ButtonList array={array} cutItem={cutItem} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render tag after addition", () => {
    const { getByText } = render(
      <ButtonList array={array} cutItem={cutItem} />
    );

    expect(getByText("tag1", { exact: false })).toBeInTheDocument();
    expect(getByText("tag2", { exact: false })).toBeInTheDocument();
  });

  it("should render no tags", () => {
    const { container } = render(<ButtonList array={[]} cutItem={cutItem} />);

    expect(container).not.toHaveTextContent();
  });

  it("should cut item from rendered array", () => {
    const trueCutItem = (e) => {
      const source = e.target.name;
      const tagList = array;
      const index = tagList.indexOf(source);
      if (index !== -1) tagList.splice(index, 1);

      array = tagList;
    };

    const { getByText } = render(
      <ButtonList array={array} cutItem={trueCutItem} />
    );

    fireEvent.click(getByText("tag1", { exact: false }));

    expect(getByText("tag1", { exact: false })).not.toBeIntheDocument;
    expect(getByText("tag2", { exact: false })).toBeInTheDocument;
  });
});

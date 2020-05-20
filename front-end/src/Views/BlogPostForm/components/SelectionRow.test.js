import React from "react";
import { fireEvent, render } from "@testing-library/react";
import SelectionRow from "./SelectionRow";
import { waitForElement } from "@testing-library/dom";

describe("SelectionRow", () => {
  let nameTags,
    nameCats,
    arrayTypeTags,
    arrayTypeCats,
    onChange,
    currentCat,
    onCut;

  beforeEach(() => {
    nameTags = "tags";
    nameCats = "category";
    arrayTypeTags = ["tag1", "tag2"];
    arrayTypeCats = ["kategoria1", "kategoria2"];
    onChange = jest
      .fn()
      .mockImplementation((e) => ([e.target.name] = e.target.value));
    currentCat = arrayTypeCats[0];
    onCut = jest.fn();
  });

  it("should render correctly", () => {
    const { container } = render(
      <SelectionRow
        name={nameCats}
        arrayType={arrayTypeCats}
        onChange={onChange}
        current={currentCat}
        onCut={onCut}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render empty tag list", () => {
    const { queryByTestId } = render(
      <SelectionRow
        name={nameTags}
        arrayType={arrayTypeTags}
        onChange={onChange}
        current={[]}
        onCut={onCut}
      />
    );

    expect(queryByTestId("buttonList")).not.toBeInTheDocument();
  });
});

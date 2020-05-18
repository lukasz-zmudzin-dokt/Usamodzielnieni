import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import ItemsList from "./ItemsList";
import { Items } from "../";
import { AlertContext } from "context/AlertContext";

jest.mock("../");

describe("ItemsList", () => {
  let props, contextA;
  beforeEach(() => {
    Items.mockImplementation(() => <div>Items</div>);

    props = {
      data: [],
      getItem: () => {},
      getItemId: () => {},
      getItemName: () => {},
      onChange: () => {},
      clear: () => {},
      children: <div></div>,
    };
    contextA = {
      showAlert: jest.fn(),
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<ItemsList {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should not render when data is null", () => {
    props.data = null;
    const { container } = render(<ItemsList {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should not render items when data array is empty", () => {
    const { queryByText } = render(<ItemsList {...props} />);

    expect(queryByText("Items")).not.toBeInTheDocument();
  });

  it("should render items when data array is not empty", () => {
    props.data = ["item"];
    const { getByText } = render(<ItemsList {...props} />);

    expect(getByText("Items")).toBeInTheDocument();
  });

  it("should add item when add button is clicked and form is valid", async () => {
    props = {
      data: ["item"],
      getItem: () => "item2",
      getItemId: (item) => item,
      onChange: jest.fn(),
      clear: jest.fn(),
    };
    const { getByText, queryByText } = render(<ItemsList {...props} />);

    await waitForElement(() => getByText("Dodaj", { exact: false }));
    expect(props.onChange).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText("Dodaj", { exact: false }));
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.clear).toHaveBeenCalledTimes(1);
    expect(
      queryByText("Taka sama pozycja", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should not add item and display error alert when add button is clicked and form is invalid", async () => {
    props = {
      data: ["item"],
      getItem: () => "item",
      getItemId: (item) => item,
      onChange: jest.fn(),
      clear: jest.fn(),
    };
    const { getByText } = render(
      <AlertContext.Provider value={contextA}>
        <ItemsList {...props} />
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Dodaj", { exact: false }));
    expect(props.onChange).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText("Dodaj", { exact: false }));
    expect(props.onChange).toHaveBeenCalledTimes(0);
    expect(props.clear).toHaveBeenCalledTimes(0);
    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Taka sama pozycja znajduje się już na liście."
    );
  });

  it("should remove item from array when onCutClick function is called", async () => {
    Items.mockImplementation(({ onCutClick }) => {
      onCutClick(2);
      return <div>Items</div>;
    });

    props = {
      data: ["item0", "item1", "item2", "item3"],
      getItemId: (item) => item,
      getItemName: (item) => item,
      onChange: jest.fn(),
    };

    const { getByText } = render(<ItemsList {...props} />);

    await waitForElement(() => getByText("Dodaj", { exact: false }));
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenNthCalledWith(1, [
      "item0",
      "item1",
      "item3",
    ]);
  });
});

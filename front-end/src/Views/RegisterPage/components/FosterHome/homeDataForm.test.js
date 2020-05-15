import { MemoryRouter } from "react-router-dom";
import HomeDataForm from "./homeDataForm";
import {
  getByTestId,
  getByText,
  waitForElement,
  fireEvent,
  render,
} from "@testing-library/react";
import React from "react";

describe("HomeDataForm", () => {
  it("should render correctly", () => {
    let data = null;
    const onBlur = () => {};
    const { container } = render(
      <MemoryRouter>
        <HomeDataForm data={data} onBlur={onBlur} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("should return missing fields error", async () => {
    const data = parent.state.homeData;
    const onBlur = jest.fn();
    const { container, getByPlaceholderText } = render(
      <MemoryRouter>
        <HomeDataForm data={data} onBlur={onBlur} />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Nazwa placówki"), {
      target: { value: "qwe" },
    });
    fireEvent.change(getByPlaceholderText("Ulica"), {
      target: { value: "qwe" },
    });
    fireEvent.change(getByPlaceholderText("Nazwa miasta"), {
      target: { value: "qwe" },
    });
    fireEvent.change(getByPlaceholderText("Kod pocztowy"), {
      target: { value: "00-001" },
    });

    fireEvent.click(getByTestId(parent, "submitBtn"));
    await waitForElement(() => getByText(container, "Podaj "));
    expect(getByText("Podaj ", { exact: false })).toBeInTheDocument();
  });
});

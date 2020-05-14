import React from "react";
import { render } from "@testing-library/react";
import DetailsItem from "./DetailsItem";

describe("DetailsItem", () => {
  it("should render without crashing", () => {
    const label = "Jakaś etykieta";
    const value = "Treść potrzebująca etykiety";

    const { container } = render(
      <DetailsItem label={label}>{value}</DetailsItem>
    );

    expect(container).toMatchSnapshot();
  });
});

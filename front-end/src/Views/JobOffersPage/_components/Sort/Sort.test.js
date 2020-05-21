import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Sort } from "../";

describe("Sort-JobOffersPage", () => {
  let props = {
    sort: "salary_min",
    setSort: (val) => val,
  };

  it("should render withoud crashing", () => {
    const { container } = render(<Sort {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should change check on click", () => {
    const { getByTestId } = render(<Sort {...props} />);

    fireEvent.click(getByTestId("checkUp-salary_min--sort"));
    expect(getByTestId("checkUp-salary_min--sort").checked).toBe(true);

    fireEvent.click(getByTestId("checkUp-salary_min--sort"));
    expect(getByTestId("checkUp-salary_min--sort").checked).toBe(false);
  });
});

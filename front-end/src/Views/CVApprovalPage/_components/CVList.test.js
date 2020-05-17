import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CVList from "./CVList";

describe("CVList", () => {
  it("should match with snapshot with 2 cvs", () => {
    const testCVs = [
      {
        cv_id: 0,
        basic_info: {
          first_name: "Jan",
          last_name: "Kowalski",
          email: "ab@cd.pl",
        },
      },
      {
        cv_id: 1,
        basic_info: {
          first_name: "Jan2",
          last_name: "Kowalski2",
          email: "ab@cd.pl2",
        },
      },
    ];
    const { container } = render(
      <MemoryRouter>
        <CVList cvs={testCVs} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("should match with snapshot with no cvs", () => {
    const { container } = render(
      <MemoryRouter>
        <CVList cvs={[]} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import Filter from "Views/JobOffersPage/_components/Filter";
import { UserContext } from "context";
import { userTypes } from "constants/userTypes";
import {userStatuses} from "constants/userStatuses";

describe("Filter(JobOffers)", () => {
  it("renders correctly", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Filter setFilters={() => null} count={10} />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should clear filters if clear button is clicked", async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Filter setFilters={jest.fn()} count={10} />
      </MemoryRouter>
    );
    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "dolnośląskie" },
    });
    fireEvent.change(getByLabelText("Okres ważności"), {
      target: { value: new Date("October 13, 2020 00:00:00") },
    });
    fireEvent.change(getByLabelText("Ilość ofert na stronie"), {
      target: { value: "80" },
    });

    fireEvent.click(getByText("Wyczyść filtry"));

    expect(getByLabelText("Województwo").value).toBe("-- Wybierz --");
    expect(getByLabelText("Okres ważności").value).toBe("");
    expect(getByLabelText("Ilość ofert na stronie").value).toBe("10");
  });

  it("should not render offers count when offers count is 0", () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Filter setFilters={jest.fn()} count={0} />
      </MemoryRouter>
    );

    expect(queryByText("Znaleziono", { exact: false })).not.toBeInTheDocument();
  });

  it("should show add offer button if account type is Employer", () => {
    const { getByText } = render(
      <UserContext.Provider value={{ type: userTypes.EMPLOYER, data: {status: userStatuses.VERIFIED} }}>
        <MemoryRouter initialEntries={["/"]}>
          <Filter setFilters={jest.fn()} count={0} />
        </MemoryRouter>
      </UserContext.Provider>
    );

    expect(getByText("Dodaj ofertę", { exact: false })).toBeInTheDocument();
  });
});

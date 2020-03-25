import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Filter from "Views/JobOffersPage/_components/Filter";

describe("Filter(JobOffers)", () => {
  it("renders correctly", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Filter setFilters={() => null} />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should clear filters if clear button is clicked", async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Filter setFilters={jest.fn()} />
      </MemoryRouter>
    );
    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "dolnośląskie" }
    });
    fireEvent.change(getByLabelText("Minimalna data wygaśnięcia oferty"), {
      target: { value: "2020-05-03" }
    });
    fireEvent.change(getByLabelText("Ilość ofert na stronie"), {
      target: { value: "80" }
    });

    fireEvent.click(getByText("Usuń filtr"));

    expect(getByLabelText("Województwo").value).toBe("-- Wybierz --");
    expect(getByLabelText("Minimalna data wygaśnięcia oferty").value).toBe("");
    expect(getByLabelText("Ilość ofert na stronie").value).toBe("10");
  });
});

import React from "react";
import { render } from "@testing-library/react";
import FormGroup from "Views/OfferForm/components/FormGroup";
import { MemoryRouter } from "react-router-dom";

describe("FormGroup", () => {
  it("renders correctly", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup header="test" type="select" setVal={() => null} />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render voivodeships if type is select", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup header="test" type="select" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByTestId("voivodeship")).toBeInTheDocument();
  });

  it("should render text if type isn't given ", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup header="test" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByTestId("default")).toBeInTheDocument();
  });

  it("should render date if type is date", () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup header="Ważne do:" type="date" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByLabelText("Ważne do:")).toBeInTheDocument();
  });

  it("should render textarea if type is textarea", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup header="test" type="textarea" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByTestId("description")).toBeInTheDocument();
  });
  it("should render invalid message if incorrect isn't null", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup
          header="test"
          type="textarea"
          setVal={() => null}
          incorrect="xd"
        />
      </MemoryRouter>
    );
    expect(getByText("xd")).toBeInTheDocument();
  });
});

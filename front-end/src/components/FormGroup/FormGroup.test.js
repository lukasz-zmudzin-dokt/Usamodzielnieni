import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FormGroup from "components/FormGroup";
import { MemoryRouter } from "react-router-dom";

describe("FormGroup", () => {
  it("renders correctly", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup header="test" type="select" id="test" setVal={() => null} />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render voivodeships if type is select", () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup
          header="Opis stanowiska"
          id="description"
          type="select"
          setVal={() => null}
        />
      </MemoryRouter>
    );
    expect(getByLabelText("Opis stanowiska")).toBeInTheDocument();
  });

  it("should render text if type isn't given ", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup header="test" id="test" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByTestId("default")).toBeInTheDocument();
  });

  it("should render date if type is date", () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup
          header="Ważne do:"
          id="expiration_date"
          type="date"
          setVal={() => null}
        />
      </MemoryRouter>
    );
    expect(getByLabelText("Ważne do:")).toBeInTheDocument();
  });

  it("should render textarea if type is textarea", () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup
          header="Opis stanowiska"
          type="textarea"
          id="description"
          setVal={() => null}
        />
      </MemoryRouter>
    );
    expect(getByLabelText("Opis stanowiska")).toBeInTheDocument();
  });

  it("should render number input if type is number", () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup header="test" type="number" id="test" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByLabelText("test")).toBeInTheDocument();
  });
  it("should render invalid message if incorrect isn't null", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup
          header="test"
          type="date"
          setVal={() => null}
          incorrect="xd"
          id="test"
        />
      </MemoryRouter>
    );
    expect(getByText("xd")).toBeInTheDocument();
  });
  it("should render disabled option if required is false", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup
          header="test"
          type="select"
          setVal={() => null}
          incorrect="xd"
          id="test"
        />
      </MemoryRouter>
    );
    expect(getByText("-- Wybierz --")).toBeInTheDocument();
  });

  it("should not be able to change text in input when disabled is true", () => {
    const Form = render(
      <MemoryRouter initialEntries={["/"]}>
        <FormGroup
          header="Nazwa firmy"
          id="company_name"
          setVal={() => null}
          incorrect="Podaj nazwę firmy"
          val="abc"
          length={{ min: 1, max: 70 }}
          required
          disabled
        />
      </MemoryRouter>
    );

    const input = Form.getByLabelText("Nazwa firmy");

    fireEvent.change(Form.getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" },
    });

    expect(input.value).toBe("abc");
  });
});

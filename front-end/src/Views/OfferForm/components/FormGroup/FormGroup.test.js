import React from "react";
import { render } from "@testing-library/react";
import FormGroup from "Views/OfferForm/components/FormGroup";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

describe("FormGroup", () => {
  it("renders correctly", () => {
    const form = renderer
      .create(<FormGroup header="Example" setVal={() => null} />)
      .toJSON();
    expect(form).toMatchSnapshot();
  });

  it("should render voivodeships if type is select", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FormGroup header="test" type="select" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByTestId("voivodeship")).toBeInTheDocument();
  });

  it("should render text if type isn't given ", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FormGroup header="test" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByTestId("default")).toBeInTheDocument();
  });

  it("should render date if type is date", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <FormGroup header="Ważne do:" type="date" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByLabelText("Ważne do:")).toBeInTheDocument();
  });

  it("should render textarea if type is textarea", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FormGroup header="test" type="textarea" setVal={() => null} />
      </MemoryRouter>
    );
    expect(getByTestId("description")).toBeInTheDocument();
  });
});

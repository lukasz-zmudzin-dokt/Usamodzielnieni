import React from "react";
import { render } from "@testing-library/react";
import FormGroup from "Views/OfferForm/components/FormGroup";
import renderer from "react-test-renderer";

describe("FormGroup", () => {
  it("should render without crashing", () => {
    render(<FormGroup header="Example" setVal={() => null} />);
  });
});

it("renders correctly", () => {
  const form = renderer
    .create(<FormGroup header="Example" setVal={() => null} />)
    .toJSON();
  expect(form).toMatchSnapshot();
});

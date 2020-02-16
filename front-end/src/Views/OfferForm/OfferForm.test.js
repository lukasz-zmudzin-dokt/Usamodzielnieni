import React from "react";
import { render } from "@testing-library/react";
import OfferForm from "Views/OfferForm";
import renderer from "react-test-renderer";

describe("OfferForm", () => {
  it("should render without crashing", () => {
    render(<OfferForm />);
  });
});

it("renders correctly", () => {
  const form = renderer.create(<OfferForm />).toJSON();
  expect(form).toMatchSnapshot();
});

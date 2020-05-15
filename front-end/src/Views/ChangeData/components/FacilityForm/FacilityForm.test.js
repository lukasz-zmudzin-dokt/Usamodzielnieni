import React from "react";
import { render } from "@testing-library/react";
import FacilityForm from "./FacilityForm";

describe("FacilityForm", () => {
  let data = {
    first_name: "user",
    last_name: "user",
    phone_number: "+48123123123",
    facility_name: "abc",
    facility_address: {
      city: "new",
      street: "city",
      street_number: "12",
      postal_code: "12-123",
    },
  };
  it("should match snapshot", () => {
    const { container } = render(
      <FacilityForm data={data} setData={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});

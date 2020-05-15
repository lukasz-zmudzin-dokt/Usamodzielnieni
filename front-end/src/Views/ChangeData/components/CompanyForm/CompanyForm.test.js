import React from "react";
import { render } from "@testing-library/react";
import CompanyForm from "./CompanyForm";

describe("CompanyForm", () => {
  let data = {
    first_name: "user",
    last_name: "user",
    phone_number: "+48123123123",
    company_name: "abc",
    company_address: {
      city: "new",
      street: "city",
      street_number: "12",
      postal_code: "12-123",
    },
    nip: "123123123",
  };

  it("should match snapshot", () => {
    const { container } = render(
      <CompanyForm data={data} setData={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});

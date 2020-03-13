import React from "react";
import { render } from "@testing-library/react";
import UserDetails from "Views/UserProfilePage/components/UserDetails";
import renderer from "react-test-renderer";

const user = {
  username: "user1",
  role: "common",
  firstName: "Jan",
  lastName: "Kowalski",
  email: "jan.kowalski@pw.edu.pl",
  phoneNumber: "+48123456789"
};

const names = {
  role: {
    admin: "Administrator",
    employer: "Pracodawca",
    common: "Podopieczny"
  },
  property: {
    username: "Nazwa użytkownika",
    role: "Rola",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "E-mail",
    phoneNumber: "Numer telefonu"
  }
};

describe("UserDetails ", () => {
  it("should render without crashing", () => {
    render(<UserDetails user={user} names={names} />);
  });
});

it("renders correctly", () => {
  const details = renderer
    .create(<UserDetails user={user} names={names} />)
    .toJSON();
  expect(details).toMatchSnapshot();
});

import React from "react";
import { render } from "@testing-library/react";
import UserBasicInfo from "Views/UserProfilePage/components/UserBasicInfo";

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

describe("UserBasicInfo ", () => {
  it("should render without crashing", () => {
    render(<UserBasicInfo user={user} names={names} />);
  });
});

it("should render correctly", () => {
  const { container } = render(
    <UserBasicInfo user={user} names={names} />
  );
  expect(container).toMatchSnapshot();
});
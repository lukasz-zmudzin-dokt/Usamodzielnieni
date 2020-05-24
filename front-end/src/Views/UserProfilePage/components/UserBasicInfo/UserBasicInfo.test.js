import React from "react";
import { render } from "@testing-library/react";
import UserBasicInfo from "Views/UserProfilePage/components/UserBasicInfo";
import { UserPicture } from "../../../../components";
import { PhotoButtonsContainer } from "../";

jest.mock("../");
jest.mock("../../../../components");

const user = {
  username: "user1",
  role: "common",
  firstName: "Jan",
  lastName: "Kowalski",
  email: "jan.kowalski@pw.edu.pl",
  phoneNumber: "+48123456789",
};

const names = {
  role: {
    admin: "Administrator",
    employer: "Pracodawca",
    common: "Podopieczny",
  },
  property: {
    username: "Nazwa użytkownika",
    role: "Rola",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "E-mail",
    phoneNumber: "Numer telefonu",
  },
};

describe("UserBasicInfo ", () => {
  let props;

  beforeEach(() => {
    jest.clearAllMocks();
    UserPicture.mockImplementation(() => <div>UserPicture</div>);
    PhotoButtonsContainer.mockImplementation(() => (
      <div>PhotoButtonsContainer</div>
    ));
    props = {
      user,
      names,
    };
  });
  it("should render correctly", () => {
    const { container } = render(<UserBasicInfo {...props} />);
    expect(container).toMatchSnapshot();
  });
});

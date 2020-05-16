import React from "react";
import { render } from "@testing-library/react";
import UserPicture from "./UserPicture";
import { userTypes } from "constants/userTypes";

describe("UserPicture", () => {
  let user;

  beforeEach(() => {
    user = {
      type: userTypes.STANDARD,
      data: {
        first_name: "Jan",
        last_name: "Kowalski",
      },
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<UserPicture user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should render staff picture", () => {
    user.type = "Staff";
    user.data.group_type = ["jakis_group_type"];

    const { container } = render(<UserPicture user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should render multi staff picture", () => {
    user.type = userTypes.STAFF;
    user.data.group_type = ["jakis_group_type", "jakiś_inny_type"];

    const { container } = render(<UserPicture user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should render without crashing when data is undefined", () => {
    user.data = undefined;

    const { container } = render(<UserPicture user={user} />);

    expect(container).toMatchSnapshot();
  });
});

import UserPasswordChangeButton from "./UserPasswordChangeButton";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("UserPasswordChangeButton", () => {
  let user;

  it("should match snapshot of open modal", () => {
    const { container, getByText } = render(
      <UserPasswordChangeButton user={user} />
    );

    fireEvent.click(getByText("Zmień hasło"));
    expect(container).toMatchSnapshot();
  });
});

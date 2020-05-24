import UserPasswordChangeButton from "./UserPasswordChangeButton";
import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";

describe("UserPasswordChangeButton", () => {
  let user;

  it("should match snapshot of open modal", async () => {
    const { container, getByText } = render(
      <UserPasswordChangeButton user={user} />
    );

    fireEvent.click(getByText("Zmień hasło"));

    await waitForElement(() => getByText("Zmiana hasła"));

    expect(container).toMatchSnapshot();
  });
});

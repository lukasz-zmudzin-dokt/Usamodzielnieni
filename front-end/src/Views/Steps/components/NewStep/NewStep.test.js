import React from "react";
import {
  render,
  fireEvent,
  queries,
  waitForElement,
} from "@testing-library/react";
import NewStep from "./NewStep";
import { UserContext, AlertContext } from "context";

describe("NewStep", () => {
  let user = {
    token: "abc",
  };
  let alertC = {
    showAlert: jest.fn(),
  };
  let props = {
    show: true,
    handleClose: jest.fn(),
    steps: {
      children: [
        {
          title: "abc",
          id: "1",
        },
      ],
    },
  };
  it("should match snapshot(step)", async () => {
    const { getByRole } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );
    const modal = getByRole("dialog");

    expect(modal).toMatchSnapshot();
  });

  it("should match snapshot(substep)", async () => {
    const { getByRole } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );
    const modal = getByRole("dialog");

    fireEvent.change(
      queries.getByLabelText(modal, "Rodzaj kroku", {
        target: {
          value: "Podkrok",
        },
      })
    );

    await waitForElement(() =>
      queries.getByText(modal, "Wybierz rodzica podkroku")
    );

    expect(modal).toMatchSnapshot();
  });
});

import React from "react";
import {
  render,
  fireEvent,
  queries,
  waitForElement,
} from "@testing-library/react";
import EditStep from "./EditStep";
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
    step: {
      id: "1",
      title: "Tytuł głównego kroku 1",
      description: "xDD",
      video: "",
      parent: "Tytuł głównego kroku 2",
    },
    steps: {
      children: [
        {
          title: "abc",
          id: "1",
        },
      ],
    },
  };
  let failFetch = false;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "POST":
            resolve({ status: 201 });
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;
  });

  it("should match snapshot(step)", async () => {
    const { getByRole } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <EditStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );
    const modal = getByRole("dialog");

    expect(modal).toMatchSnapshot();
  });
});

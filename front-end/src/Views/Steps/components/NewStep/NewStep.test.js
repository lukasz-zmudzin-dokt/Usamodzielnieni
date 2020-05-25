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
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );
    const modal = getByRole("dialog");

    expect(modal).toMatchSnapshot();
  });

  it("should send data", async () => {
    const { getByRole, getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByLabelText("Wybierz krok poprzedzający"));
    fireEvent.change(
      getByLabelText("Wybierz krok poprzedzający", {
        target: { value: "abc" },
      })
    );

    fireEvent.change(
      getByLabelText("Opis kroku", {
        target: {
          value: "siema",
        },
      })
    );

    fireEvent.click(getByText("Dodaj krok"));

    expect(alertC.showAlert).toHaveBeenCalledWith("xd");
  });

  //   it("should match snapshot(substep)", async () => {
  //     const { getByRole } = render(
  //       <UserContext.Provider value={user}>
  //         <AlertContext.Provider value={alertC}>
  //           <NewStep {...props} />
  //         </AlertContext.Provider>
  //       </UserContext.Provider>
  //     );
  //     const modal = getByRole("dialog");

  //     fireEvent.change(
  //       queries.getByLabelText(modal, "Rodzaj kroku", {
  //         target: {
  //           value: "Podkrok",
  //         },
  //       })
  //     );

  //     await waitForElement(() => queries.getByText(modal, "Dodaj nowy podkrok"));

  //     expect(modal).toMatchSnapshot();
  //   });
});

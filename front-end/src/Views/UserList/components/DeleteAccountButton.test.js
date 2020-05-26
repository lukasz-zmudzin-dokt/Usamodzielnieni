import React from "react";
import { render, fireEvent, wait, queries } from "@testing-library/react";
import DeleteAccountButton from "./DeleteAccountButton";
import { AlertContext } from "context";
import { UserContext } from "context/UserContext";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";

describe("DeleteAccountButton", () => {
  let apiShouldFail;
  let user;
  let contextA;
  let afterDeletion;
  let context;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiShouldFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "DELETE":
              resolve({ status: 200 });
              break;
            default:
              reject({});
              break;
          }
        }
      });
    });
  });
  beforeEach(() => {
    apiShouldFail = false;
    user = {
      token: "123",
      logout: jest.fn(),
    };
    contextA = {
      showAlert: jest.fn(),
    };
    afterDeletion = jest.fn();
    context = {
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.VERIFICATION, staffTypes.BLOG_MODERATOR],
      },
    };
  });

  it("should render without crashing", async () => {
    const { container } = render(
      <UserContext.Provider value={context}>
        <DeleteAccountButton user={user} />
      </UserContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should open modal when button is clicked", async () => {
    const { getByText } = render(
      <UserContext.Provider value={context}>
        <DeleteAccountButton user={user} />
      </UserContext.Provider>
    );

    fireEvent.click(getByText("Usuń konto", { exact: false }));

    expect(
      getByText("Czy na pewno chcesz usunąć to konto?")
    ).toBeInTheDocument();
  });

  it("should display success alert when confirmation button is clicked", async () => {
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <UserContext.Provider value={context}>
          <DeleteAccountButton user={user} afterDeletion={afterDeletion} />
        </UserContext.Provider>
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Usuń konto", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Usuń", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();

    await wait(() =>
      expect(
        queryByText("Czy na pewno chcesz usunąć to konto?", { exact: false })
      ).not.toBeInTheDocument()
    );

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Pomyślnie usunięto konto.",
      "success"
    );
  });

  it("should display error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <UserContext.Provider value={context}>
          <DeleteAccountButton user={user} />
        </UserContext.Provider>
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Usuń konto", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Usuń", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();
    await wait(() =>
      expect(
        queryByText("Czy na pewno chcesz usunąć to konto?", { exact: false })
      ).not.toBeInTheDocument()
    );

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas usuwania konta."
    );
    expect(getByText("Usuń konto")).toBeInTheDocument();
  });
});

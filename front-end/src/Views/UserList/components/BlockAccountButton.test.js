import React from "react";
import { render, fireEvent, wait, queries } from "@testing-library/react";
import BlockAccountButton from "./BlockAccountButton";
import { AlertContext, UserContext } from "context";
import {userTypes} from "constants/userTypes";
import {staffTypes} from "constants/staffTypes";

describe("BlockAccountButton", () => {
  let apiShouldFail;
  let user;
  let contextA;
  let setUser;
  let context;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiShouldFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "POST":
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
    setUser = jest.fn();
    context = {
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.VERIFICATION, staffTypes.BLOG_MODERATOR]
      }
    }
  });

  it("should render without crashing", async () => {
    const { container } = render(
        <UserContext.Provider value={context}>
          <BlockAccountButton user={user} />
        </UserContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should open modal when button is clicked", async () => {
    const { getByText } = render(
        <UserContext.Provider value={context}>
          <BlockAccountButton user={user} />
        </UserContext.Provider>
    );

    fireEvent.click(getByText("Zablokuj konto", { exact: false }));

    expect(
      getByText("Czy na pewno chcesz zablokować to konto?")
    ).toBeInTheDocument();
  });

  it("should display success alert when confirmation button is clicked", async () => {
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <UserContext.Provider value={context}>
          <BlockAccountButton user={user} setUser={setUser}/>
        </UserContext.Provider>
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Zablokuj konto", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Zablokuj", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();

    await wait(() =>
      expect(
        queryByText("Czy na pewno chcesz zablokować to konto?", {
          exact: false,
        })
      ).not.toBeInTheDocument()
    );

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Pomyślnie zablokowano konto.",
      "success"
    );
  });

  it("should display error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <UserContext.Provider value={context}>
          <BlockAccountButton user={user} setUser={setUser}/>
        </UserContext.Provider>
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Zablokuj konto", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Zablokuj", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();
    await wait(() =>
      expect(
        queryByText("Czy na pewno chcesz zablokować to konto?", {
          exact: false,
        })
      ).not.toBeInTheDocument()
    );

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas blokowania konta."
    );
    expect(getByText("Zablokuj konto")).toBeInTheDocument();
  });
});

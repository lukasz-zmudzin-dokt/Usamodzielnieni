import React from "react";
import { render, fireEvent, wait, queries } from "@testing-library/react";
import UnblockAccountButton from "./UnblockAccountButton";
import { AlertContext } from "context";

describe("UnblockAccountButton", () => {
  let apiShouldFail;
  let user;
  let contextA;
  let setUser;
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
  });

  it("should render without crashing", async () => {
    const { container } = render(<UnblockAccountButton user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should open modal when button is clicked", async () => {
    const { getByText } = render(<UnblockAccountButton user={user} />);

    fireEvent.click(getByText("Odblokuj konto", { exact: false }));

    expect(
      getByText("Czy na pewno chcesz odblokować to konto?")
    ).toBeInTheDocument();
  });

  it("should display success alert when confirmation button is clicked", async () => {
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <UnblockAccountButton user={user} setUser={setUser} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Odblokuj konto", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Odblokuj", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();

    await wait(() =>
      expect(
        queryByText("Czy na pewno chcesz odblokować to konto?", {
          exact: false,
        })
      ).not.toBeInTheDocument()
    );

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Pomyślnie odblokowano konto.",
      "success"
    );
  });

  it("should display error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <UnblockAccountButton user={user} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Odblokuj konto", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Odblokuj", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();
    await wait(() =>
      expect(
        queryByText("Czy na pewno chcesz odblokować to konto?", {
          exact: false,
        })
      ).not.toBeInTheDocument()
    );

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas odblokowywania konta."
    );
    expect(getByText("Odblokuj konto")).toBeInTheDocument();
  });
});

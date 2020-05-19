import React from "react";
import { render, fireEvent, wait, queries } from "@testing-library/react";
import BlockAccountButton from "./BlockAccountButton";
import { AlertContext } from "context";

describe("BlockAccountButton", () => {
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
    const { container } = render(<BlockAccountButton user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should open modal when button is clicked", async () => {
    const { getByText } = render(<BlockAccountButton user={user} />);

    fireEvent.click(getByText("Zablokuj konto", { exact: false }));

    expect(
      getByText("Czy na pewno chcesz zablokować to konto?")
    ).toBeInTheDocument();
  });

  it("should display success alert when confirmation button is clicked", async () => {
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <BlockAccountButton user={user} setUser={setUser} />
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
        <BlockAccountButton user={user} />
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

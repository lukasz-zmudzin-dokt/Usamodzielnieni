import React from "react";
import { render, fireEvent, wait, queries } from "@testing-library/react";
import DeleteAccountButton from "./DeleteAccountButton";
import { AlertContext } from "context";

describe("DeleteAccountButton", () => {
  let apiShouldFail;
  let user;
  let contextA;
  let afterDeletion;
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
  });

  it("should render without crashing", async () => {
    const { container } = render(<DeleteAccountButton user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should open modal when button is clicked", async () => {
    const { getByText } = render(<DeleteAccountButton user={user} />);

    fireEvent.click(getByText("Usuń konto", { exact: false }));

    expect(
      getByText("Czy na pewno chcesz usunąć to konto?")
    ).toBeInTheDocument();
  });

  it("should display success alert when confirmation button is clicked", async () => {
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <DeleteAccountButton user={user} afterDeletion={afterDeletion} />
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
        <DeleteAccountButton user={user} />
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

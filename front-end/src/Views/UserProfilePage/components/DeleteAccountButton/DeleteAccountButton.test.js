import React from "react";
import { render, fireEvent, wait, queries } from "@testing-library/react";
import DeleteAccountButton from "./DeleteAccountButton";

describe("DeleteAccountButton", () => {
  let apiShouldFail;
  let user;
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
  });

  it("should render without crashing", async () => {
    const { container } = render(<DeleteAccountButton user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should open modal when button is clicked", async () => {
    const { getByText } = render(<DeleteAccountButton user={user} />);

    fireEvent.click(getByText("Usuń konto", { exact: false }));

    expect(
      getByText("Czy na pewno chcesz usunąć swoje konto?")
    ).toBeInTheDocument();
  });

  it("should logout user when confirmation button is clicked", async () => {
    const { getByText, getByRole, queryByText } = render(
      <DeleteAccountButton user={user} />
    );

    fireEvent.click(getByText("Usuń konto", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Usuń", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();
    await wait(() => expect(user.logout).toHaveBeenCalledTimes(1));

    expect(
      queryByText("Czy na pewno chcesz usunąć swoje konto?", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should display error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText, getByRole, queryByText } = render(
      <DeleteAccountButton user={user} />
    );

    fireEvent.click(getByText("Usuń konto", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Usuń", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();
    await wait(() =>
      expect(
        queryByText("Czy na pewno chcesz usunąć swoje konto?", { exact: false })
      ).not.toBeInTheDocument()
    );

    // TODO: dodać sprawdzanie alertu
    expect(getByText("Usuń konto")).toBeInTheDocument();
  });
});

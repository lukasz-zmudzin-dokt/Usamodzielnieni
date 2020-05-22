import React from "react";
import { render, fireEvent, wait, queries } from "@testing-library/react";
import ChangePhotoButton from "./ChangePhotoButton";
import { AlertContext } from "context";

describe("ChangePhotoButton", () => {
  let apiShouldFail;
  let user;
  let contextA;
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
  });

  it("should render without crashing", async () => {
    const { container } = render(<ChangePhotoButton user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should open modal when button is clicked", async () => {
    const { getByText } = render(<ChangePhotoButton user={user} />);

    fireEvent.click(getByText("Usuń", { exact: false }));

    expect(getByText("Czy chcesz usunąć swoje konto?")).toBeInTheDocument();
  });

  it("should logout user when confirmation button is clicked", async () => {
    const { getByText, getByRole, queryByText } = render(
      <ChangePhotoButton user={user} />
    );

    fireEvent.click(getByText("Usuń", { exact: false }));

    const modal1 = getByRole("dialog");
    fireEvent.click(queries.getByText(modal1, "Usuń", { exact: false }));

    const modal2 = getByRole("dialog");
    fireEvent.click(queries.getByText(modal2, "Usuń", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();
    await wait(() => expect(user.logout).toHaveBeenCalledTimes(1));

    expect(
      queryByText("Czy na pewno chcesz usunąć swoje konto?", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should display error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <ChangePhotoButton user={user} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Usuń", { exact: false }));

    const modal1 = getByRole("dialog");
    fireEvent.click(queries.getByText(modal1, "Usuń", { exact: false }));

    const modal2 = getByRole("dialog");
    fireEvent.click(queries.getByText(modal2, "Usuń", { exact: false }));

    expect(getByText("Ładowanie...")).toBeInTheDocument();
    await wait(() =>
      expect(
        queryByText("Czy na pewno chcesz usunąć swoje konto?", { exact: false })
      ).not.toBeInTheDocument()
    );

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas usuwania konta."
    );
    expect(getByText("Usuń konto")).toBeInTheDocument();
  });
});

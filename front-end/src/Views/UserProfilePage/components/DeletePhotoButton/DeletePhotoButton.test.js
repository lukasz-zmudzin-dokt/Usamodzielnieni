import React from "react";
import { render, fireEvent, wait, queries } from "@testing-library/react";
import DeletePhotoButton from "./DeletePhotoButton";
import { AlertContext } from "context";

describe("DeletePhotoButton", () => {
  let apiShouldFail, user, contextAlert;
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
      changeData: jest.fn(),
      data: {
        picture_url: "/url",
      },
    };
    contextAlert = {
      showAlert: jest.fn(),
    };
  });

  it("should render without crashing", async () => {
    const { container } = render(<DeletePhotoButton user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should open modal when button is clicked", async () => {
    const { getByText } = render(<DeletePhotoButton user={user} />);

    fireEvent.click(getByText("Usuń", { exact: false }));

    expect(getByText("Czy chcesz usunąć zdjęcie?")).toBeInTheDocument();
  });

  it("should logout user when confirmation button is clicked", async () => {
    const { getByText, getByRole, queryByText } = render(
      <DeletePhotoButton user={user} />
    );

    fireEvent.click(getByText("Usuń", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Usuń", { exact: false }));

    await wait(() => expect(user.changeData).toHaveBeenCalledTimes(1));

    expect(queryByText("Czy chcesz usunąć zdjęcie?")).not.toBeInTheDocument();
  });

  it("should display error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText, getByRole, queryByText } = render(
      <AlertContext.Provider value={contextAlert}>
        <DeletePhotoButton user={user} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Usuń", { exact: false }));

    const modal = getByRole("dialog");
    fireEvent.click(queries.getByText(modal, "Usuń", { exact: false }));

    await wait(() =>
      expect(queryByText("Czy chcesz usunąć zdjęcie?")).not.toBeInTheDocument()
    );

    expect(contextAlert.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas usuwania zdjęcia."
    );
    expect(getByText("Usuń")).toBeInTheDocument();
  });
});

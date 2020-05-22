import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  wait,
} from "@testing-library/react";
import AddCvForm from "./AddCvForm";
import { MemoryRouter } from "react-router-dom";
import { AlertContext } from "context";

describe("AddCvForm", () => {
  let isCvVerified;
  let apiStatus;
  let user;
  let id;
  const alertC = {
    showAlert: jest.fn(),
  };
  beforeAll(() => {
    user = { token: "abc123" };
    id = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        switch (init.method) {
          case "POST":
            resolve({ status: apiStatus || 201 });
            break;
          case "GET":
            resolve(
              apiStatus
                ? { status: apiStatus }
                : {
                    status: 200,
                    json: () =>
                      Promise.resolve({
                        results: [
                          {
                            cv_id: "1",
                            name: "nazwa cv",
                            is_verified: isCvVerified,
                          },
                          {
                            cv_id: "2",
                            name: "nazwa cv 2",
                            is_verified: isCvVerified,
                          },
                        ],
                      }),
                  }
            );
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });
  beforeEach(() => {
    apiStatus = undefined;
    isCvVerified = true;
    jest.clearAllMocks();
  });

  it("should render without crashing", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <AddCvForm id={id} user={user} />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Aplikuj do oferty"));

    expect(container).toMatchSnapshot();
  });

  it("should render error alert when api returns error", async () => {
    apiStatus = 500;
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AddCvForm id={id} user={user} />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Wystąpił błąd", { exact: false }));
    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
    expect(queryByText("Aplikuj do oferty")).not.toBeInTheDocument();
    expect(queryByText("Utwórz CV")).not.toBeInTheDocument();
  });

  it("should render button with link to cvEditor when user has no verified CV", async () => {
    isCvVerified = false;
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AddCvForm id={id} user={user} />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("utwórz nowe CV"));
    expect(getByText("utwórz nowe CV")).toBeInTheDocument();
    expect(queryByText("Aplikuj do oferty")).not.toBeInTheDocument();
  });

  it("should render apply button when user is verified", async () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AddCvForm id={id} user={user} />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Aplikuj do oferty"));
    expect(getByText("Aplikuj do oferty")).toBeInTheDocument();
    expect(queryByText("utwórz nowe CV")).not.toBeInTheDocument();
  });

  it("should render error alert when api returns error after click", async () => {
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <AddCvForm id={id} user={user} />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Aplikuj do oferty"));
    apiStatus = 500;
    fireEvent.click(getByText("Aplikuj do oferty"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas składania aplikacji na ofertę."
    );
  });

  it("should render fail alert when api returns already added status after click", async () => {
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <AddCvForm id={id} user={user} />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Aplikuj do oferty"));
    apiStatus = 403;
    fireEvent.click(getByText("Aplikuj do oferty"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Już zaaplikowano do danego ogłoszenia."
    );
  });

  it("should render success alert when api returns success after click", async () => {
    const { getByText, getByLabelText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <AddCvForm id={id} user={user} />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Aplikuj do oferty"));
    fireEvent.change(getByLabelText("Wybierz CV", { exact: false }), {
      target: { value: "2" },
    });
    fireEvent.click(getByText("Aplikuj do oferty"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie zaaplikowano do ogłoszenia.",
      "success"
    );
  });

  it("should render loading alert when component is waiting for api response", async () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AddCvForm id={id} user={user} />
      </MemoryRouter>
    );

    expect(getByText("Ładowanie", { exact: false })).toBeInTheDocument();
    expect(queryByText("Aplikuj do oferty")).not.toBeInTheDocument();
    expect(queryByText("utwórz nowe CV")).not.toBeInTheDocument();

    await waitForElement(() => getByText("Aplikuj do oferty"));
  });
});

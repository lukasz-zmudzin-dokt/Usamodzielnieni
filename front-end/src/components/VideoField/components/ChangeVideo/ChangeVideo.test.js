import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import ChangeVideo from "./ChangeVideo";
import { AlertContext } from "context";

describe("ChangeVideo", () => {
  let failFetch = false;
  let alertC = {
    showAlert: jest.fn(),
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "PUT":
            resolve({
              status: 200,
            });
            break;

          default:
            reject({});
            break;
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    failFetch = false;
  });

  it("should render without crashing", () => {
    const { container } = render(
      <ChangeVideo id={1} token="abc" setVideo={jest.fn()} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should send data", async () => {
    const { getByText, getByLabelText } = render(
      <AlertContext.Provider value={alertC}>
        <ChangeVideo id={1} token="abcxd" setVideo={jest.fn()} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Zmień film"));

    await wait(() => expect(getByText("Wklej nowy url:")).toBeInTheDocument());

    fireEvent.change(getByLabelText("Podaj link do filmu"), {
      target: {
        value: "https://www.youtube.com/watch?v=q6EoRBvdVPQ",
      },
    });

    fireEvent.change(getByLabelText("Opis(opcjonalne)"), {
      target: {
        value: "śmieszny film",
      },
    });

    fireEvent.click(getByText("Prześlij"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie zmieniono film.",
      "success"
    );
  });

  it("should not send data if api fails", async () => {
    failFetch = true;
    const { getByText, getByLabelText } = render(
      <AlertContext.Provider value={alertC}>
        <ChangeVideo id={1} token="abcxd" setVideo={jest.fn()} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Zmień film"));

    await wait(() => expect(getByText("Wklej nowy url:")).toBeInTheDocument());

    fireEvent.change(getByLabelText("Podaj link do filmu"), {
      target: {
        value: "https://www.youtube.com/watch?v=q6EoRBvdVPQ",
      },
    });

    fireEvent.click(getByText("Prześlij"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie udało się zmienić filmu."
    );
  });

  it("should close modal", async () => {
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={alertC}>
        <ChangeVideo id={1} token="abcxd" setVideo={jest.fn()} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Zmień film"));

    await wait(() => expect(getByText("Wklej nowy url:")).toBeInTheDocument());

    fireEvent.click(getByText("×"));

    await wait(() =>
      expect(queryByText("Wklej nowy url:")).not.toBeInTheDocument()
    );
  });

  it("should not send data if fields are empty", async () => {
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <ChangeVideo id={1} token="abcxd" setVideo={jest.fn()} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Zmień film"));

    await wait(() => expect(getByText("Wklej nowy url:")).toBeInTheDocument());

    fireEvent.click(getByText("Prześlij"));

    await wait(() => expect(fetch).not.toHaveBeenCalled());
  });
});

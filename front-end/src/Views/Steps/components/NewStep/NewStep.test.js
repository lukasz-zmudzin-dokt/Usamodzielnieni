import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from "@testing-library/react";
import NewStep from "./NewStep";
import { UserContext, AlertContext } from "context";

describe("NewStep", () => {
  let user = {
    token: "abc",
  };
  let alertC = {
    showAlert: jest.fn(),
  };
  let props = {
    show: true,
    handleClose: jest.fn(),
    steps: {
      children: [
        {
          title: "abc",
          id: "1",
        },
      ],
    },
  };
  let failFetch = false;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({
            status: 500,
            json: () => Promise.resolve({ error: "złe coś" }),
          });
        }
        switch (init.method) {
          case "POST":
            resolve({
              status: 201,
              json: () => Promise.resolve({ message: "xd" }),
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
    failFetch = false;
    jest.clearAllMocks();
  });

  it("should match snapshot(step)", async () => {
    const { getByRole } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );
    const modal = getByRole("dialog");

    expect(modal).toMatchSnapshot();
  });

  it("should send data", async () => {
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByLabelText("Wybierz krok poprzedzający"));
    fireEvent.change(getByLabelText("Wybierz krok poprzedzający"), {
      target: { value: "abc" },
    });

    fireEvent.change(getByLabelText("Opis kroku"), {
      target: {
        value: "siema",
      },
    });

    fireEvent.change(getByLabelText("Tytuł kroku"), {
      target: {
        value: "siema",
      },
    });

    fireEvent.click(getByText("Dodaj krok"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith("xd", "success");
  });

  it("should not send data if api fail", async () => {
    failFetch = true;
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByLabelText("Wybierz krok poprzedzający"));
    fireEvent.change(getByLabelText("Wybierz krok poprzedzający"), {
      target: { value: "abc" },
    });

    fireEvent.change(getByLabelText("Opis kroku"), {
      target: {
        value: "siema",
      },
    });

    fireEvent.change(getByLabelText("Tytuł kroku"), {
      target: {
        value: "siema",
      },
    });

    fireEvent.click(getByText("Dodaj krok"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith("złe coś");
  });

  it("should not send data if required fields are empty", async () => {
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByLabelText("Wybierz krok poprzedzający"));
    fireEvent.change(getByLabelText("Wybierz krok poprzedzający"), {
      target: { value: "abc" },
    });

    fireEvent.change(getByLabelText("Opis kroku"), {
      target: {
        value: "siema",
      },
    });

    fireEvent.click(getByText("Dodaj krok"));

    await wait(() => expect(fetch).not.toHaveBeenCalled());
  });

  it("should send substep", async () => {
    const { getByLabelText, getByText, getByRole } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <NewStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByLabelText("Wybierz krok poprzedzający"));
    fireEvent.change(getByLabelText("Rodzaj kroku"), {
      target: { value: "Podkrok" },
    });

    await waitForElement(() => getByText("Dodaj nowy podkrok"));

    const modal = getByRole("dialog");

    fireEvent.change(getByLabelText("Tytuł podkroku"), {
      target: {
        value: "siema",
      },
    });

    fireEvent.click(getByText("Dodaj podkrok"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith("xd", "success");
    expect(modal).toMatchSnapshot();
  });
});

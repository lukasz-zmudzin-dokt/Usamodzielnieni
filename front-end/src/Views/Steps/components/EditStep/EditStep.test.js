import React from "react";
import {
  render,
  fireEvent,
  wait,
  waitForElement,
} from "@testing-library/react";
import EditStep from "./EditStep";
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
    step: {
      id: "2",
      title: "Krok 2",
      description: "Opis 2",
      type: "main",
      next: [],
    },
    handleClose: jest.fn(),
    root: {
      id: "0",
      title: "root",
      type: "main",
      next: [{ title: "Krok 1", id: "1" }],
    },
    steps: [
      {
        id: "1",
        title: "Krok 1",
        description: "Opis 1",
        type: "main",
        next: [
          { title: "Dalej", id: "1.1" },
          { title: "Krok2", id: "2" },
        ],
      },
      {
        id: "1.1",
        title: "Krok 1.1",
        description: "Opis 1.1",
        type: "sub",
        next: [{ title: "Krok 2", id: "2" }],
      },
      {
        id: "2",
        title: "Krok 2",
        description: "Opis 2",
        type: "main",
        next: [],
      },
    ],
  };
  let failFetch = false;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({
            status: 500,
            json: () => Promise.resolve({ message: "gitara" }),
          });
        }
        switch (init.method) {
          case "PUT":
            resolve({
              status: 200,
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
          <EditStep {...props} />
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
          <EditStep {...props} />
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

    fireEvent.click(getByText("Prześlij zmiany"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith("xd", "success");
  });

  it("should not send data if api fails", async () => {
    failFetch = true;
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <EditStep {...props} />
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

    fireEvent.click(getByText("Prześlij zmiany"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith("gitara");
  });

  it("should not send data if required field is empty", async () => {
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <EditStep {...props} />
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
        value: "",
      },
    });

    fireEvent.click(getByText("Prześlij zmiany"));

    await wait(() => expect(fetch).not.toHaveBeenCalled());
  });

  it("should not send data if required field is empty", async () => {
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <EditStep {...props} />
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
        value: "",
      },
    });

    fireEvent.click(getByText("Prześlij zmiany"));

    await wait(() => expect(fetch).not.toHaveBeenCalled());
  });

  it("should send substep", async () => {
    let props = {
      show: true,
      handleClose: jest.fn(),
      step: {
        id: "1",
        title: "Tytuł głównego kroku 1",
        video: "",
        parent: "Tytuł głównego kroku 2",
      },
      steps: {
        children: [
          {
            title: "abc",
            id: "1",
          },
        ],
      },
    };
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <EditStep {...props} />
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByLabelText("Wybierz rodzica podkroku"));
    fireEvent.change(getByLabelText("Wybierz rodzica podkroku"), {
      target: { value: "abc" },
    });

    fireEvent.change(getByLabelText("Tytuł podkroku"), {
      target: {
        value: "tytuł",
      },
    });

    fireEvent.click(getByText("Prześlij zmiany"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith("xd", "success");
  });
});

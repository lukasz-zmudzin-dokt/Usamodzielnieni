import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from "@testing-library/react";
import RemoveOffer from "./RemoveOffer";
import { AlertContext } from "context";

let mock_apiError = false;
jest.mock("../../functions/deleteOffer", () => ({
  deleteOffer: (id, token) => {
    if (mock_apiError) {
      throw Error("err");
    }
    return;
  },
}));

describe("RemoveOffer", () => {
  let props;
  const alertC = {
    showAlert: jest.fn(),
  };
  beforeAll(() => {
    props = {
      id: "123",
      user: { token: "abc" },
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { container } = render(<RemoveOffer {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("should render success alert when api returns success", async () => {
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <RemoveOffer {...props} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Usuń ofertę"));
    fireEvent.click(getByText("Tak"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie usunięto ofertę.",
      "success"
    );
  });

  it("should render error alert when api throws error", async () => {
    mock_apiError = true;
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <RemoveOffer {...props} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Usuń ofertę"));
    fireEvent.click(getByText("Tak"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd przy usuwaniu oferty."
    );
  });
});

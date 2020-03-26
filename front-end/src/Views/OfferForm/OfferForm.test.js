import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from "@testing-library/react";
import { Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import OfferForm from "Views/OfferForm";
import { createMemoryHistory } from "history";

const renderWithRouter = (
  ui,
  {
    route = "/offerForm",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
};

describe("OfferForm", () => {
  let failFetch;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "POST":
            resolve({ status: 200 });
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

  it("renders correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <OfferForm />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should clear state when offer is send", async () => {
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <OfferForm />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByLabelText("Opis stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value: new Date()
      }
    });

    fireEvent.click(getByTestId("submitBtn"));

    await waitForElement(() => getByLabelText("Ważne do:"));

    expect(getByPlaceholderText("Nazwa stanowiska").value).toBe("");
    expect(getByPlaceholderText("Nazwa firmy").value).toBe("");
    expect(getByPlaceholderText("Adres firmy").value).toBe("");
    expect(getByLabelText("Województwo").value).toBe("dolnośląskie");
    expect(getByLabelText("Opis stanowiska").value).toBe("");
    expect(getByLabelText("Ważne do:").value).toBe("");
  });
  it("should not clear state when api return failure", async () => {
    failFetch = true;

    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <OfferForm />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByLabelText("Opis stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value: new Date()
      }
    });

    fireEvent.click(getByTestId("submitBtn"));

    await waitForElement(() => getByTestId("fail"));

    expect(getByTestId("fail")).toBeInTheDocument();
  });

  it("should not use fetch when form isn't validated", async () => {
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <OfferForm />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "" }
    });
    fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByLabelText("Opis stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value: ""
      }
    });

    fireEvent.click(getByTestId("submitBtn"));

    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it("should redirect when offer is send", async () => {
    const { history, getByLabelText, getByTestId } = renderWithRouter(
      <OfferForm />
    );

    fireEvent.change(getByLabelText("Nazwa stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Nazwa firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Adres firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByLabelText("Opis stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value:
          "Wed Dec 04 2020 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)"
      }
    });

    fireEvent.click(getByTestId("submitBtn"));

    await wait(() => {
      expect(fetch).toHaveBeenCalled();
    });
    expect(history.location.pathname).toEqual("/myOffers");
  });
});

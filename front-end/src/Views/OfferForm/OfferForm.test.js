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

export default renderWithRouter;

describe("OfferForm", () => {
  let token;
  let failFetch;
  beforeAll(() => {
    token = "123";
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
    OfferForm.submit = jest.fn().mockImplementation((input, init) => {
      const exampleDate = new Date();
      const month =
        exampleDate.getMonth() + 1 < 10
          ? `0${exampleDate.getMonth() + 1}`
          : exampleDate.getMonth() + 1;
      const day =
        exampleDate.getDate() < 10
          ? `0${exampleDate.getDate()}`
          : exampleDate.getDate();
      return { day, month };
    });
  });

  beforeEach(() => {
    failFetch = false;
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const location = { pathname: "/" };
    const { component } = render(
      <MemoryRouter>
        <OfferForm location={location} token={token} />
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it("shoud clear state when offer is send", async () => {
    const location = { pathname: "/" };
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <OfferForm location={location} token={token} />
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
    fireEvent.change(getByTestId("voivodeship"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByTestId("description"), { target: { value: "abcd" } });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value:
          "Wed Mar 25 2020 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)"
      }
    });

    fireEvent.click(getByTestId("submitBtn"));

    await waitForElement(() => getByLabelText("Ważne do:"));

    expect(getByPlaceholderText("Nazwa stanowiska").value).toBe("");
    expect(getByPlaceholderText("Nazwa firmy").value).toBe("");
    expect(getByPlaceholderText("Adres firmy").value).toBe("");
    expect(getByTestId("voivodeship").value).toBe("dolnośląskie");
    expect(getByTestId("description").value).toBe("");
    expect(getByLabelText("Ważne do:").value).toBe("");
  });
  it("should not clear state when api return failure", async () => {
    failFetch = true;
    const location = { pathname: "/" };
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <OfferForm location={location} token={token} />
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
    fireEvent.change(getByTestId("voivodeship"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByTestId("description"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value:
          "Wed Mar 25 2020 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)"
      }
    });

    fireEvent.click(getByTestId("submitBtn"));

    await waitForElement(() => getByPlaceholderText("Nazwa stanowiska"));

    expect(getByPlaceholderText("Nazwa stanowiska").value).toBe("abcd");
  });

  it("should not return appropriate message when one of input is invalid", async () => {
    const location = { pathname: "/" };
    const {
      getByPlaceholderText,
      getByTestId,
      getByLabelText,
      queryByTestId
    } = render(
      <MemoryRouter>
        <OfferForm location={location} token={token} />
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
    fireEvent.change(getByTestId("voivodeship"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByTestId("description"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value:
          "Wed Mar 25 2020 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)"
      }
    });

    fireEvent.click(getByTestId("submitBtn"));

    expect(queryByTestId("sendMsg")).not.toBeInTheDocument();
  });

  it("should not use fetch when form isn't validated", async () => {
    const location = { pathname: "/" };
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <OfferForm location={location} token={token} />
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
    fireEvent.change(getByTestId("voivodeship"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByTestId("description"), {
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
    const {
      history,
      getByPlaceholderText,
      getByTestId,
      getByLabelText
    } = renderWithRouter(<OfferForm />);

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByTestId("voivodeship"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByTestId("description"), {
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
    expect(history.location.pathname).toEqual("/user");
  });
});

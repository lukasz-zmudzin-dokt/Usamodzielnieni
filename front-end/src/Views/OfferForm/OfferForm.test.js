import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from "@testing-library/react";
import { Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import OfferForm from "Views/OfferForm";
import { createMemoryHistory } from "history";
import { UserContext, AlertContext } from "context";
import proxy from "config/api";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "abc",
  }),
}));

const reactRouterDom = require("react-router-dom");

const renderWithRouter = (
  ui,
  {
    route = "/offerForm",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = {
    data: {
      company_name: "abc",
      company_address: { street: "def", street_number: "1", city: "abc", postal_code: "00-000" },
    },
  };
  let contextA = {
    open: true,
    changeVisibility: jest.fn(),
    message: "abc",
    changeMessage: jest.fn(),
    showAlert: jest.fn()
  };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <Router history={history}>{ui}</Router>
        </AlertContext.Provider>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("OfferForm", () => {
  let failFetch;
  let failOffer;
  let failPost;
  let failTypes;
  let context;
  let contextA;
  let apiSelect = { offer_types: ["IT"], categories: ["xd"] };
  let apiOffer = {
    offer_name: "abc",
    company_name: "xd",
    company_address: { street: "def", street_number: "1", city: "abc", postal_code: "00-000" },
    voivodeship: "lubelskie",
    description: "res.description",
    expiration_date:
      "Wed May 17 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)",
    category: "xd",
    type: "IT",
  };
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "PUT":
            resolve({ status: 200 });
            break;
          case "POST":
            if (failPost) resolve({ status: 500 });
            else resolve({ status: 200 });
            break;
          case "GET":
            if (proxy.job + "job-offer/abc/" === input && failOffer) {
              resolve({ status: 500 });
            } else if (proxy.job + "job-offer/abc/" === input) {
              resolve({ status: 200, json: () => Promise.resolve(apiOffer) });
            } else if (failTypes && input === proxy.job + "enums/types") {
              resolve({ status: 500 });
            } else {
              resolve({ status: 200, json: () => Promise.resolve(apiSelect) });
            }

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
    failOffer = false;
    failTypes = false;
    failPost = false;
    reactRouterDom.useParams = () => ({
      id: "",
    });
    jest.clearAllMocks();
    context = {
      data: {
        company_name: "abc",
        company_address: { street: "def", street_number: "1", city: "abc", postal_code: "00-000"},
      },
    };
    contextA = {
      open: true,
      changeVisibility: jest.fn(),
      message: "abc",
      changeMessage: jest.fn(),
      showAlert: jest.fn()
    };
  });

  it("renders correctly", async () => {
    const { container, getByText } = render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Dodaj"));

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should return [] if api fails(selects)", async () => {
    failFetch = true;

    const { getByText } = render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </AlertContext.Provider>
      </UserContext.Provider>
    );
    await waitForElement(() => getByText("Dodaj"));

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Nie udało się załadować danych."
    );
  });

  it("should return [] if api fails(types)", async () => {
    failTypes = true;

    const { getByText } = render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </AlertContext.Provider>
      </UserContext.Provider>
    );
    await waitForElement(() => getByText("Dodaj"));

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Nie udało się załadować danych."
    );
  });

  it("should not use fetch when form isn't validated", async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Dodaj"));

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "lubelskie" },
    });
    fireEvent.change(getByLabelText("Opis stanowiska"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Branża"), {
      target: { value: "xd" },
    });
    fireEvent.change(getByLabelText("Wymiar pracy"), {
      target: { value: "IT" },
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value:
          "Wed Jan 20 2021 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)",
      },
    });

    fireEvent.click(getByText("Dodaj"));

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("should redirect when offer is send", async () => {
    // jest.resetModules();

    const {
      history,
      getByLabelText,
      getByPlaceholderText,
      getByText,
    } = renderWithRouter(<OfferForm />);

    await waitForElement(() => getByText("Dodaj"));

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "lubelskie" },
    });
    fireEvent.change(getByLabelText("Opis stanowiska"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Branża"), {
      target: { value: "xd" },
    });
    fireEvent.change(getByLabelText("Wymiar pracy"), {
      target: { value: "IT" },
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value:
          "Wed Dec 04 2020 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)",
      },
    });

    fireEvent.click(getByText("Dodaj"));

    await wait(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/myOffers");
  });

  it("should redirect when offer id isnt valid", async () => {
    failOffer = true;
    reactRouterDom.useParams = () => ({
      id: "abc",
    });
    const { history, getByText } = renderWithRouter(<OfferForm />, {
      route: "/offerForm/abc",
    });

    expect(history.location.pathname).toEqual("/offerForm/abc");

    await waitForElement(() => getByText("Dodaj ofertę"));

    expect(history.location.pathname).toEqual("/offerForm");
  });

  it("should return fail message if server fails", async () => {
    failPost = true;
    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <UserContext.Provider value={context}>
        <AlertContext.Provider value={contextA}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Dodaj"));

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" },
    });

    fireEvent.change(getByLabelText("Województwo"), {
      target: { value: "lubelskie" },
    });
    fireEvent.change(getByLabelText("Opis stanowiska"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Branża"), {
      target: { value: "xd" },
    });
    fireEvent.change(getByLabelText("Wymiar pracy"), {
      target: { value: "IT" },
    });
    fireEvent.change(getByLabelText("Ważne do:"), {
      target: {
        value: new Date("2024-9-20"),
      },
    });

    fireEvent.click(getByText("Dodaj"));

    await waitForElement(() => getByText("Dodaj"));

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Nie udało się wysłać oferty. Błąd serwera."
    );
  });

  it("should fulfill inputs if offer id is valid", async () => {
    reactRouterDom.useParams = () => ({
      id: "abc",
    });
    const {
      getByPlaceholderText,
      getByLabelText,
      getByText,
    } = renderWithRouter(<OfferForm />, {
      route: "/offerForm/abc",
    });

    await waitForElement(() => getByText("Dodaj"));

    await wait(() =>
      expect(fetch).toHaveBeenCalledWith(proxy.job + "job-offer/abc/", {
        headers: {
          Authorization: "Token undefined",
          "Content-Type": "application/json",
          Origin: null,
        },
        method: "GET",
      })
    );

    expect(getByPlaceholderText("Nazwa stanowiska").value).toBe("abc");
    expect(getByPlaceholderText("Nazwa firmy").value).toBe("xd");
    expect(getByLabelText("Województwo").value).toBe("lubelskie");
    expect(getByLabelText("Opis stanowiska").value).toBe("res.description");
    expect(getByLabelText("Branża").value).toBe("xd");
    expect(getByLabelText("Wymiar pracy").value).toBe("IT");
    expect(getByLabelText("Ważne do:").value).toBe("17.05.2023");
  });

  it("should send edited offer", async () => {
    reactRouterDom.useParams = () => ({
      id: "abc",
    });
    const { getByPlaceholderText, history, getByText } = renderWithRouter(
      <OfferForm />,
      {
        route: "/offerForm/abc",
      }
    );

    await waitForElement(() => getByText("Dodaj"));

    await wait(() =>
      expect(fetch).toHaveBeenCalledWith(proxy.job + "job-offer/abc/", {
        headers: {
          Authorization: "Token undefined",
          "Content-Type": "application/json",
          Origin: null,
        },
        method: "GET",
      })
    );
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
      target: { value: "abcd" },
    });

    fireEvent.click(getByText("Dodaj"));

    await wait(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/myOffers");
  });
});

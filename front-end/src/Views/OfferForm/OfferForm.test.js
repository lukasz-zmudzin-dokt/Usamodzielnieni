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
import { UserContext } from "context";

const renderWithRouter = (
  ui,
  {
    route = "/offerForm",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = { data: { company_name: "abc", company_address: "xd" } };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <Router history={history}>{ui}</Router>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("OfferForm", () => {
  let failFetch;
  let context;
  let apiSelect = { offer_types: ["IT"], categories: ["xd"] };
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
          case "GET":
            resolve({ status: 200, json: () => Promise.resolve(apiSelect) });
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
    context = { data: { company_name: "abc", company_address: "xd" } };
  });

  it("renders correctly", async () => {
    const { container, getByText } = render(
      <UserContext.Provider value={context}>
        <MemoryRouter>
          <OfferForm />
        </MemoryRouter>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Dodaj"));

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should return [] if api fails(selects)", async () => {
    failFetch = true;

    const { getByText } = render(
      <UserContext.Provider value={context}>
        <MemoryRouter>
          <OfferForm />
        </MemoryRouter>
      </UserContext.Provider>
    );
    await waitForElement(() => getByText("Dodaj"));

    await waitForElement(() =>
      getByText("Coś poszło nie tak.", { exact: false })
    );
    expect(
      getByText("Coś poszło nie tak.", { exact: false })
    ).toBeInTheDocument();
  });

  it("should not clear state when api return failure", async () => {
    const { getByPlaceholderText, getByLabelText, getByText } = render(
      <UserContext.Provider value={context}>
        <MemoryRouter>
          <OfferForm />
        </MemoryRouter>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Dodaj"));

    failFetch = true;

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
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
        value: new Date(),
      },
    });

    fireEvent.click(getByText("Dodaj"));

    await waitForElement(() =>
      getByText("Coś poszło nie tak.", { exact: false })
    );

    expect(
      getByText("Coś poszło nie tak.", { exact: false })
    ).toBeInTheDocument();
  });

  it("should not use fetch when form isn't validated", async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <UserContext.Provider value={context}>
        <MemoryRouter>
          <OfferForm />
        </MemoryRouter>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Dodaj"));

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
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
        value: new Date(),
      },
    });

    fireEvent.click(getByText("Dodaj"));

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("should redirect when offer is send", async () => {
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
    fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
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
});

import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  wait,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OfferPosition from "./OfferPosition";
import { AlertContext } from "context";
import proxy from "config/api";

describe("OfferPosition", () => {
  let fetchType;
  let alertC = {
    showAlert: jest.fn(),
  };
  let offer = {
    category: "IT",
    company_address: {
      city: "Wwa",
      postal_code: "21-371",
      street: "Polna",
      street_number: "225",
    },
    company_name: "Firemka",
    description:
      "Szukamy lajkoników w mediach spolecznosciowych. Oferujemy dobra place, karte Multisport...",
    expiration_date: "2020-12-21",
    id: "sadgergerfwefwe",
    offer_name: "Lajkonik",
    type: "Praca",
    voivodeship: "mazowieckie",
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        switch (fetchType) {
          case "approveOk":
            resolve({
              status: 200,
              json: () =>
                Promise.resolve({
                  message: "Ustawiono potwierdzenie oferty pracy",
                }),
            });
            break;
          case "rejectOk":
            resolve({
              status: 200,
              json: () =>
                Promise.resolve({ message: "Offer removed successfully" }),
            });
            break;
          case "odd":
            resolve({
              status: 400,
              json: () =>
                Promise.resolve({
                  message: "Suma podstawy równa się kwadratowi obu ramion",
                }),
            });
            break;
          case "fail":
            resolve({ status: 500 });
            break;
          default:
            reject();
            break;
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <OfferPosition offer={offer} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("mazowieckie"));
    expect(container).toMatchSnapshot();
  });

  it("should approve offer", async () => {
    fetchType = "approveOk";
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <OfferPosition offer={offer} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("Akceptuj"));
    fireEvent.click(getByText("Akceptuj"));
    await expect(fetch).toHaveBeenCalledWith(
      proxy.job + "admin/confirm/sadgergerfwefwe/",
      {
        body: '{"confirmed":true}',
        headers: {
          Authorization: "token undefined",
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie potwierdzono ofertę",
      "success"
    );
  });

  it("should view error when approving offer fails", async () => {
    fetchType = "fail";
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <OfferPosition offer={offer} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("Akceptuj"));
    fireEvent.click(getByText("Akceptuj"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie udało się potwierdzić oferty."
    );
  });

  it("should view error when approving offer returns odd api response", async () => {
    fetchType = "odd";
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <OfferPosition offer={offer} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("Akceptuj"));
    fireEvent.click(getByText("Akceptuj"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie udało się potwierdzić oferty."
    );
  });

  it("should reject offer", async () => {
    fetchType = "rejectOk";
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <OfferPosition offer={offer} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("Odrzuć"));
    fireEvent.click(getByText("Odrzuć"));
    await expect(fetch).toHaveBeenCalledWith(
      proxy.job + "job-offer/sadgergerfwefwe/",
      {
        headers: {
          Authorization: "token undefined",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie odrzucono ofertę.",
      "success"
    );
  });

  it("should view error when rejecting offer fails", async () => {
    fetchType = "fail";
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <OfferPosition offer={offer} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("Odrzuć"));
    fireEvent.click(getByText("Odrzuć"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie udało się odrzucić oferty."
    );
  });

  it("should view error when rejecting offer returns odd api response", async () => {
    fetchType = "odd";
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <OfferPosition offer={offer} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("Odrzuć"));
    fireEvent.click(getByText("Odrzuć"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Nie udało się odrzucić oferty."
    );
  });
});

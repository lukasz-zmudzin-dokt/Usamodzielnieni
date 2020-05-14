import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import MyOffersPage from "./MyOffersPage";
import { MemoryRouter } from "react-router-dom";

describe("MyOffers", () => {
  let fetchCheck;
  let apiOffers = [
    {
      category: "IT",
      company_address: "Warszawa, Wolska 1",
      company_name: "employer1",
      description: "dsdsasa",
      expiration_date: "2020-04-29",
      id: "0cbd646a-c51f-46ad-afee-753a68e20614",
      offer_name: "sadsadas",
      type: "Praca",
      voivodeship: "dolnośląskie",
    },
    {
      category: "IT",
      company_address: "Warszawa, Wolska 1",
      company_name: "employer1",
      description: "adssadd",
      expiration_date: "2020-05-02",
      id: "a39d260a-f085-4106-966a-f561e6e06301",
      offer_name: "sdas",
      type: "Praca",
      voivodeship: "dolnośląskie",
    },
    {
      category: "IT",
      company_address: "adress1",
      company_name: "company1",
      description: "description123",
      expiration_date: "2020-05-28",
      id: "47991e86-4b42-4507-b154-1548bf8a3bd3",
      offer_name: "offer2",
      type: "Staż",
      voivodeship: "mazowieckie",
    },
  ];

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        switch (fetchCheck) {
          case "fail":
            resolve({ status: 500 });
            break;
          case "empty":
            resolve({
              status: 200,
              json: () => Promise.resolve({ count: 0, results: [] }),
            });
            break;
          case "normal":
            resolve({
              status: 200,
              json: () => Promise.resolve({ count: 3, results: apiOffers }),
            });
            break;
          default:
            reject([]);
        }
      });
    });
  });

  beforeEach(() => {
    fetchCheck = "normal";
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <MyOffersPage />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("offer2"));
    expect(container).toMatchSnapshot();
  });

  it("should load offers", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MyOffersPage />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("offer2"));
    expect(getByText("offer2")).toBeInTheDocument();
  });

  it("should view alert at api fail", async () => {
    fetchCheck = "fail";
    const { getByText } = render(
      <MemoryRouter>
        <MyOffersPage />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Ups, wystąpił błąd."));
    expect(getByText("Ups, wystąpił błąd.")).toBeInTheDocument();
  });

  it("should view alert at api returning no cvs", async () => {
    fetchCheck = "empty";
    const { getByText } = render(
      <MemoryRouter>
        <MyOffersPage />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Brak ofert"));
    expect(getByText("Brak ofert")).toBeInTheDocument();
  });
});

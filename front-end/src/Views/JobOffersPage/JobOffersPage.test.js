import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import JobOffersPage from "Views/JobOffersPage";

describe("JobOffersPage", () => {
  let failFetch = false;
  let apiOffers = [];
  let count;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({
                status: 200,
                json: () => Promise.resolve({ results: apiOffers, count })
              });
              break;
            default:
              reject({});
              break;
          }
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;
    apiOffers = [];
    jest.clearAllMocks();
  });

  describe("filter tests", () => {
    it("should return every offer if not filters is used", async () => {
      count = 3;
      apiOffers = [
        {
          id: "abcdc",
          offer_name: "asd",
          company_name: "xd",
          company_address: "xd",
          voivodeship: "zachodniopomorskie",
          expiration_date: "2020-06-06",
          description: "asda"
        },
        {
          id: "abcdb",
          offer_name: "asd",
          company_name: "xd",
          company_address: "xd",
          voivodeship: "zachodniopomorskie",
          expiration_date: "2020-06-06",
          description: "asda"
        },
        {
          id: "abcda",
          offer_name: "asd",
          company_name: "xd",
          company_address: "xd",
          voivodeship: "zachodniopomorskie",
          expiration_date: "2020-06-06",
          description: "asda"
        }
      ];

      const { getAllByText } = render(
        <MemoryRouter initialEntries={["/jobOffers"]}>
          <JobOffersPage />
        </MemoryRouter>
      );

      expect(fetch).toHaveBeenCalledTimes(1);

      await waitForElement(() => getAllByText("Pokaż szczegóły"));
      expect(getAllByText("Pokaż szczegóły").length).toBe(3);
    });
    it("should return url with appropriate voivodeships", async () => {
      count = 1;
      apiOffers = [
        {
          id: "abcdc",
          offer_name: "asd",
          company_name: "xd",
          company_address: "xd",
          voivodeship: "lubelskie",
          expiration_date: "2020-06-06",
          description: "asda"
        }
      ];

      const { getByLabelText, getByText, getAllByText } = render(
        <MemoryRouter initialEntries={["/jobOffers"]}>
          <JobOffersPage />
        </MemoryRouter>
      );

      fireEvent.change(getByLabelText("Województwo"), {
        target: { value: "lubelskie" }
      });

      fireEvent.click(getByText("Filtruj oferty"));

      await waitForElement(() => getAllByText("Pokaż szczegóły"));

      expect(fetch).toHaveBeenCalledWith(
        "https://usamo-back.herokuapp.com/job/job-offers/?page=1&page_size=10&voivodeship=lubelskie",
        {
          headers: {
            Authorization: "Token undefined",
            "Content-Type": "application/json"
          },
          method: "GET"
        }
      );
    });
    it("should return url with appropriate date", async () => {
      count = 1;
      apiOffers = [
        {
          id: "abcdc",
          offer_name: "asd",
          company_name: "xd",
          company_address: "xd",
          voivodeship: "lubelskie",
          expiration_date: "2020-06-06",
          description: "asda"
        }
      ];

      const { getByLabelText, getByText, getAllByText } = render(
        <MemoryRouter initialEntries={["/jobOffers"]}>
          <JobOffersPage />
        </MemoryRouter>
      );

      fireEvent.change(getByLabelText("Okres ważności"), {
        target: { value: new Date("May 5, 2020 00:00:00") }
      });

      fireEvent.click(getByText("Filtruj oferty"));

      await waitForElement(() => getAllByText("Pokaż szczegóły"));

      expect(fetch).toHaveBeenCalledWith(
        "https://usamo-back.herokuapp.com/job/job-offers/?page=1&page_size=10&min_expiration_date=2020-05-05",
        {
          headers: {
            Authorization: "Token undefined",
            "Content-Type": "application/json"
          },
          method: "GET"
        }
      );
    });

    it("should return url with appropriate filters", async () => {
      count = 1;
      apiOffers = [
        {
          id: "abcdc",
          offer_name: "asd",
          company_name: "xd",
          company_address: "xd",
          voivodeship: "lubelskie",
          expiration_date: "2020-06-06",
          description: "asda"
        }
      ];

      const { getByLabelText, getByText, getAllByText } = render(
        <MemoryRouter initialEntries={["/jobOffers"]}>
          <JobOffersPage />
        </MemoryRouter>
      );

      fireEvent.change(getByLabelText("Okres ważności"), {
        target: { value: new Date("December 31, 2020 00:00:00") }
      });
      fireEvent.change(getByLabelText("Województwo"), {
        target: { value: "lubelskie" }
      });
      fireEvent.change(getByLabelText("Ilość ofert na stronie"), {
        target: { value: 21 }
      });

      fireEvent.click(getByText("Filtruj oferty"));

      await waitForElement(() => getAllByText("Pokaż szczegóły"));

      expect(fetch).toHaveBeenCalledWith(
        "https://usamo-back.herokuapp.com/job/job-offers/?page=1&page_size=21&voivodeship=lubelskie&min_expiration_date=2020-12-31",
        {
          headers: {
            Authorization: "Token undefined",
            "Content-Type": "application/json"
          },
          method: "GET"
        }
      );
    });
  });

  describe("main component tests", () => {
    let location;
    beforeEach(() => {
      location = { search: "" };
      apiOffers = [
        {
          id: "abc123",
          offer_name: "Nazwa oferty 1",
          company_name: "Nazwa firmy 1",
          company_address: "Adres firmy 1",
          voivodeship: "zachodniopomorskie",
          expiration_date: "2020-12-12",
          description: "Jakiś dłuuuuuuuuuuuuuugi opis"
        }
      ];
      count = 1;
    });

    it("should render without crashing", async () => {
      const { container, getByText } = render(
        <MemoryRouter>
          <JobOffersPage location={location} />
        </MemoryRouter>
      );

      await waitForElement(() => getByText("Nazwa oferty 1"));

      expect(container).toMatchSnapshot();
    });

    it("should render loading alert when component is waiting for api response", async () => {
      const { getByText, queryByText } = render(
        <MemoryRouter>
          <JobOffersPage location={location} />
        </MemoryRouter>
      );

      expect(getByText("Ładowanie", { exact: false })).toBeInTheDocument();
      expect(queryByText("Nazwa oferty 1")).not.toBeInTheDocument();
      await waitForElement(() => getByText("Nazwa oferty 1"));
    });

    it("should render error alert when api returns error", async () => {
      failFetch = true;
      const { getByText, queryByText } = render(
        <MemoryRouter>
          <JobOffersPage location={location} />
        </MemoryRouter>
      );

      await waitForElement(() => getByText("Wystąpił błąd", { exact: false }));
      expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
      expect(queryByText("Nazwa oferty 1")).not.toBeInTheDocument();
    });

    it("should render info alert when api returns empty list", async () => {
      apiOffers = [];
      const { getByText } = render(
        <MemoryRouter>
          <JobOffersPage location={location} />
        </MemoryRouter>
      );

      await waitForElement(() => getByText("Brak ofert", { exact: false }));
      expect(getByText("Brak ofert", { exact: false })).toBeInTheDocument();
    });
  });
});

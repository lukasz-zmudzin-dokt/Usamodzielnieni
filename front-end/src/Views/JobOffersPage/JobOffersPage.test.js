import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import JobOffersPage from "Views/JobOffersPage";

describe("JobOffersPage", () => {
  let failFetch = false;
  let apiOffers = [];
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
                json: () => Promise.resolve(apiOffers)
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
      apiOffers = {
        results: [
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
        ]
      };

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
      apiOffers = {
        results: [
          {
            id: "abcdc",
            offer_name: "asd",
            company_name: "xd",
            company_address: "xd",
            voivodeship: "lubelskie",
            expiration_date: "2020-06-06",
            description: "asda"
          }
        ]
      };

      const { getByLabelText, getByText, getAllByText } = render(
        <MemoryRouter initialEntries={["/jobOffers"]}>
          <JobOffersPage />
        </MemoryRouter>
      );

      fireEvent.change(getByLabelText("Województwo"), {
        target: { value: "lubelskie" }
      });

      fireEvent.click(getByText("Filtruj"));

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
      apiOffers = {
        results: [
          {
            id: "abcdc",
            offer_name: "asd",
            company_name: "xd",
            company_address: "xd",
            voivodeship: "lubelskie",
            expiration_date: "2020-06-06",
            description: "asda"
          }
        ]
      };

      const { getByLabelText, getByText, getAllByText } = render(
        <MemoryRouter initialEntries={["/jobOffers"]}>
          <JobOffersPage />
        </MemoryRouter>
      );

      fireEvent.change(getByLabelText("Minimalna data wygaśnięcia oferty"), {
        target: { value: "2020-05-05" }
      });

      fireEvent.click(getByText("Filtruj"));

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
      apiOffers = {
        results: [
          {
            id: "abcdc",
            offer_name: "asd",
            company_name: "xd",
            company_address: "xd",
            voivodeship: "lubelskie",
            expiration_date: "2020-06-06",
            description: "asda"
          }
        ]
      };

      const { getByLabelText, getByText, getAllByText } = render(
        <MemoryRouter initialEntries={["/jobOffers"]}>
          <JobOffersPage />
        </MemoryRouter>
      );

      fireEvent.change(getByLabelText("Minimalna data wygaśnięcia oferty"), {
        target: { value: "2020-05-05" }
      });
      fireEvent.change(getByLabelText("Województwo"), {
        target: { value: "lubelskie" }
      });
      fireEvent.change(getByLabelText("Ilość ofert na stronie"), {
        target: { value: 21 }
      });

      fireEvent.click(getByText("Filtruj"));

      await waitForElement(() => getAllByText("Pokaż szczegóły"));

      expect(fetch).toHaveBeenCalledWith(
        "https://usamo-back.herokuapp.com/job/job-offers/?page=1&page_size=21&voivodeship=lubelskie&min_expiration_date=2020-05-05",
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
});

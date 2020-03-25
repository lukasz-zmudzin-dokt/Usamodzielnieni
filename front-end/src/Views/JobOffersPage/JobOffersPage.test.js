import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitForElement, act } from "@testing-library/react";
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
  it("should return every offer if not filters is used", async () => {
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
});

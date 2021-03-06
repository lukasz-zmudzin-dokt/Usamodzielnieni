import React from "react";
import { render, waitForElement, wait } from "@testing-library/react";
import MyOffer from "./MyOffer";
import { MemoryRouter } from "react-router-dom";
import { AlertContext } from "context";

describe("MyOffers", () => {
  let fetchType;
  let alertC = {
    showAlert: jest.fn(),
  };
  let testOffer = {
    category: "IT",
    company_address: "adress1",
    company_name: "company1",
    description: "description123",
    expiration_date: "2020-05-28",
    id: "47991e86-4b42-4507-b154-1548bf8a3bd3",
    offer_name: "offer2",
    type: "Staż",
    voivodeship: "mazowieckie",
  };
  let apiPeople = {
    count: 1,
    results: [
      {
        cv_url: "/media/test_cv",
        date_posted: "2020-04-06T01:34:27.899000+02:00",
        email: "standard1@standard1.com",
        first_name: "standard1",
        job_offer: "47991e86-4b42-4507-b154-1548bf8a3bd3",
        last_name: "standard1",
        user_id: "b582b042-d6d8-4e57-9447-564a6748b4f7",
        id: "abc",
      },
    ],
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        switch (fetchType) {
          case "fail":
            resolve({ status: 500 });
            break;
          case "empty":
            resolve({ status: 200, json: () => Promise.resolve([]) });
            break;
          case "answers":
            resolve({ status: 200, json: () => Promise.resolve(apiPeople) });
            break;
          case "offer":
            resolve({ status: 200, json: () => Promise.resolve(testOffer) });
            break;
          default:
            reject([]);
        }
      });
    });
  });

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        switch (fetchType) {
          case "fail":
            resolve({ status: 500 });
            break;
          case "empty":
            resolve({ status: 200, json: () => Promise.resolve([]) });
            break;
          case "answers":
            resolve({ status: 200, json: () => Promise.resolve(apiPeople) });
            break;
          case "offer":
            resolve({ status: 200, json: () => Promise.resolve(testOffer) });
            break;
          default:
            reject([]);
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    fetchType = "answers";
    const { container, getByText } = render(
      <MemoryRouter>
        <MyOffer
          offer={testOffer}
          activeOffer={testOffer.id}
          setActiveOffer={(e) => {}}
        />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("standard1 standard1"));

    expect(container).toMatchSnapshot();
  });

  it("should display an error", async () => {
    fetchType = "fail";
    render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <MyOffer
            offer={testOffer}
            activeOffer={testOffer.id}
            setActiveOffer={(e) => {}}
          />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Ups, wystąpił błąd. Nie udało się załadować aplikujących do oferty."
    );
  });

  it("should fetch user data", async () => {
    fetchType = "answers";
    const { getByText } = render(
      <MemoryRouter>
        <MyOffer
          offer={testOffer}
          activeOffer={testOffer.id}
          setActiveOffer={(e) => {}}
        />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("standard1 standard1"));

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should display offer tab", async () => {
    fetchType = "fail";
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <MyOffer
            offer={testOffer}
            activeOffer={testOffer.id}
            setActiveOffer={(e) => {}}
          />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await waitForElement(() => getByText("offer2"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Ups, wystąpił błąd. Nie udało się załadować aplikujących do oferty."
    );
    expect(getByText("offer2")).toBeInTheDocument();
  });

  it("should not render download button", async () => {
    apiPeople.results = [];
    const { queryByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <MyOffer
            offer={testOffer}
            activeOffer={testOffer.id}
            setActiveOffer={(e) => {}}
          />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(queryByText("Pobierz zgłoszenia")).not.toBeInTheDocument();
  });
});

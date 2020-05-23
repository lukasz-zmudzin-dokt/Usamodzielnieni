import React from "react";
import {
  render,
  waitForElement,
  wait,
  fireEvent,
} from "@testing-library/react";
import CVApprovalPage from "./CVApprovalPage";
import { MemoryRouter } from "react-router-dom";
import { AlertContext } from "context";
import { waitForElementToBeRemoved } from "@testing-library/dom";

describe("CVApproval", () => {
  let failFetch;
  let apiCVs;
  let contextA = {
    showAlert: jest.fn(),
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "POST":
            resolve({ status: 200, json: () => Promise.resolve({}) });
            break;
          case "GET":
            resolve({ status: 200, json: () => Promise.resolve(apiCVs) });
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });

  beforeEach(() => {
    apiCVs = {
      results: [
        {
          cv_id: 0,
          basic_info: {
            first_name: "Jarek",
            last_name: "Arek",
            email: "jamjestjarek@arek.pp",
          },
        },
        {
          cv_id: 1,
          basic_info: {
            first_name: "Ala",
            last_name: "Mala",
            email: "malaala@lala.la",
          },
        },
      ]
    };
    failFetch = false;
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <CVApprovalPage />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Jarek"));
    expect(container).toMatchSnapshot();
  });

  it("should load cvs", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <CVApprovalPage />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Jarek"));
    expect(getByText("Jarek")).toBeInTheDocument();
  });

  it("should view alert at api fail", async () => {
    failFetch = true;
    render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <CVApprovalPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await wait(() => expect(contextA.showAlert).toHaveBeenCalled());

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Nie udało się załadować CV."
    );
  });

  it("should view alert at api returning no cvs", async () => {
    apiCVs.results = [];
    const { getByText } = render(
      <MemoryRouter>
        <CVApprovalPage />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Brak CV do akceptacji."));
    expect(getByText("Brak CV do akceptacji.")).toBeInTheDocument();
  });

  it("should hide cv on accept", async () => {
    apiCVs.results = [apiCVs.results[0]];
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <CVApprovalPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Akceptuj"));
    expect(getByText("Jarek")).toBeInTheDocument();
    fireEvent.click(getByText("Akceptuj"));
    await waitForElementToBeRemoved(() => getByText("Jarek"));
    expect(queryByText("Jarek")).not.toBeInTheDocument();

    await wait(() => expect(contextA.showAlert).toHaveBeenCalled());
    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Pomyślnie zaakceptowano CV.",
      "success"
    );
  });

  it("should render alert on api fail while accepting", async () => {
    apiCVs.results = [apiCVs.results[0]];
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <CVApprovalPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Akceptuj"));
    expect(getByText("Jarek")).toBeInTheDocument();

    failFetch = true;
    fireEvent.click(getByText("Akceptuj"));
    const cv = await waitForElement(() => queryByText("Jarek"));
    expect(cv).not.toBe(null);

    await wait(() => expect(contextA.showAlert).toHaveBeenCalled());
    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Nie udało się zaakceptować użytkownika."
    );
  });
});

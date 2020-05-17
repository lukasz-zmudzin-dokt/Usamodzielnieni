import React from "react";
import {
  waitForElement,
  render,
  fireEvent,
  waitForElementToBeRemoved,
  wait,
} from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { UserContext, AlertContext } from "context";
import { createMemoryHistory } from "history";
import MyCVsPage from "./MyCVsPage";
import { userTypes } from "constants/userTypes";

const renderWithRouter = (
  ui,
  {
    route = "/myCVs",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = { type: userTypes.STANDARD };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <Router history={history}>{ui}</Router>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("MyCVsPage", () => {
  let failFetch;
  let myCVs;
  let user;
  const alertC = {
    showAlert: jest.fn(),
  };
  beforeAll(() => {
    global.open = jest.fn();
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "GET":
            resolve({ status: 200, json: () => Promise.resolve(myCVs) });
            break;
          case "DELETE":
            resolve({ status: 200 });
            break;
          default:
            reject({});
            break;
        }
      });
    });

    user = {
      type: userTypes.STANDARD,
      token: "123",
    };
  });

  beforeEach(() => {
    myCVs = [
      {
        cv_id: 0,
        name: "jeden",
        basic_info: {
          first_name: "Jarek",
          last_name: "Arek",
          email: "jamjestjarek@arek.pp",
        },
      },
      {
        cv_id: 1,
        name: "dwa",
        basic_info: {
          first_name: "Ala",
          last_name: "Mala",
          email: "malaala@lala.la",
        },
      },
    ];
    failFetch = false;
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const { container, getAllByText } = render(
      <UserContext.Provider value={user}>
        <MemoryRouter>
          <MyCVsPage />
        </MemoryRouter>
      </UserContext.Provider>
    );

    await waitForElement(() => getAllByText("Zobacz CV", { exact: false }));
    expect(container).toMatchSnapshot();
  });

  it("should render alert on api fail", async () => {
    failFetch = true;
    const { getByText, queryByText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={alertC}>
          <MemoryRouter>
            <MyCVsPage />
          </MemoryRouter>
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    expect(getByText("Ładuję", { exact: false })).toBeInTheDocument();

    await waitForElement(() =>
      getByText("Ups, coś poszło nie tak. Nie można pobrać listy CV.")
    );
    expect(
      getByText("Ups, coś poszło nie tak. Nie można pobrać listy CV.")
    ).toBeInTheDocument();
    expect(queryByText("Ładuję", { exact: false })).not.toBeInTheDocument();
  });

  it("should render no cv alert", async () => {
    myCVs = [];
    const { getByText } = render(
      <UserContext.Provider value={user}>
        <MemoryRouter>
          <MyCVsPage />
        </MemoryRouter>
      </UserContext.Provider>
    );
    await waitForElement(() => getByText("Nie masz", { exact: false }));
    expect(getByText("Nie masz", { exact: false })).toBeInTheDocument();
  });

  it("should redirect to cveditor", async () => {
    myCVs = [myCVs[0]];
    const { history, getByText } = renderWithRouter(<MyCVsPage />);

    await waitForElement(() => getByText("Edytuj"));
    fireEvent.click(getByText("Edytuj"));

    expect(history.location.pathname).toEqual("/cvEditor/0");
  });

  it("should delete cv on button click", async () => {
    myCVs = [myCVs[0]];
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <MyCVsPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Usuń CV"));
    expect(getByText("jeden")).toBeInTheDocument();

    fireEvent.click(getByText("Usuń CV"));
    await waitForElement(() => getByText("Czy na pewno chcesz usunąć to CV?"));
    fireEvent.click(getByText("Usuń ✗"));

    await waitForElementToBeRemoved(() => getByText("jeden"));
    await expect(queryByText("jeden")).not.toBeInTheDocument();
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie usunięto CV",
      "success"
    );
  });

  it("should render error on delete fail", async () => {
    myCVs = [myCVs[0]];
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <MyCVsPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Usuń CV"));
    expect(getByText("jeden")).toBeInTheDocument();
    failFetch = true;
    fireEvent.click(getByText("Usuń CV"));
    await waitForElement(() => getByText("Czy na pewno chcesz usunąć to CV?"));
    fireEvent.click(getByText("Usuń ✗"));
    const cv = await waitForElement(() => queryByText("jeden"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(cv).not.toBeNull();
    expect(getByText("jeden")).toBeInTheDocument();
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas usuwania CV."
    );
  });

  it("should render alert on max cvs reached", async () => {
    const maxCVs = [
      {
        cv_id: 3,
        name: "trzy",
      },
      {
        cv_id: 4,
        name: "cztery",
      },
      {
        cv_id: 5,
        name: "pięć",
      },
    ];
    myCVs = [...myCVs, ...maxCVs];

    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <MyCVsPage />
      </MemoryRouter>
    );

    await waitForElement(() => getAllByText("Usuń CV"));
    expect(
      getByText("Osiągnięto maksymalną liczbę CV", { exact: false })
    ).toBeInTheDocument();
  });
});

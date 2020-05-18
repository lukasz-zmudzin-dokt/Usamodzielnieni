import React from "react";
import {
  fireEvent,
  render,
  waitForElement,
  wait,
} from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import CVPosition from "./CVPosition";
import { UserContext, AlertContext } from "context";
import { createMemoryHistory } from "history";
import { staffTypes } from "constants/staffTypes";
import proxy from "config/api";
import { userTypes } from "constants/userTypes";

const renderWithRouter = (
  ui,
  {
    route = "/cvApproval",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = {
    type: userTypes.STAFF,
    data: { group_type: [staffTypes.CV] },
  };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <Router history={history}>{ui}</Router>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("CVPosition", () => {
  let failFetch;
  let apiCV = {
    cv_id: 0,
    basic_info: {
      first_name: "Jarek",
      last_name: "Arek",
      email: "jamjestjarek@arek.pp",
    },
  };
  let alertC = {
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
            resolve({
              status: 200,
              json: () => Promise.resolve("/media/cv/0"),
            });
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <CVPosition cv={apiCV} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Jarek"));
    expect(container).toMatchSnapshot();
  });

  it("should call showCV when asked to", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <CVPosition cv={apiCV} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Jarek"));
    fireEvent.click(getByText("Pokaż CV"));

    await expect(fetch).toHaveBeenCalledWith(proxy.cv + "generator/0/", {
      headers: {
        Authorization: "token undefined",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  });

  it("should redirect to cv feedback", async () => {
    const { history, getByText } = renderWithRouter(<CVPosition cv={apiCV} />);

    await waitForElement(() => getByText("Jarek"));
    fireEvent.click(getByText("Zgłoś poprawki", { exact: false }));

    expect(history.location.pathname).toEqual("/cvCorrection/0", {
      exact: false,
    });
  });

  it("should return cv url from api", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <CVPosition cv={apiCV} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Jarek"));
    fireEvent.click(getByText("Pokaż CV", { exact: false }));

    await waitForElement(() =>
      fetch(proxy.cv + "generator/" + apiCV.cv_id + "/", {
        method: "GET",
      })
    );
    expect(global.open).toHaveBeenCalledWith(
      proxy.plain + "/media/cv/0",
      "_blank"
    );
  });

  it("should return alert on cv url fetch from failing api", async () => {
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <CVPosition cv={apiCV} />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Jarek"));

    failFetch = true;
    fireEvent.click(getByText("Pokaż CV", { exact: false }));
    await waitForElement(() =>
      fetch(proxy.cv + "generator/" + apiCV.cv_id + "/", {
        method: "GET",
      })
    );
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith("Nie udało się pobrać CV.");
  });
});

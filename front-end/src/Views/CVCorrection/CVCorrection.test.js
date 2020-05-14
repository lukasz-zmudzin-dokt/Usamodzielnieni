import React from "react";
import { render, waitForElement } from "@testing-library/react";
import CVCorrection from "./CVCorrection";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { UserContext } from "context";

jest.mock("./_components", () => ({
  CVRender: ({ url }) => <div>{`render${url}`}</div>,
  CorrectionForm: () => <div>correction</div>,
}));

let context = { token: "abc" };
let id = "abcdef";

const renderWithRouter = (
  ui,
  {
    route = `/cvCorrection/${id}`,
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(
      <UserContext.Provider value={context}>
        <Router history={history}>{ui}</Router>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("CVCorrection", () => {
  let failFetch = false;
  let url = "/media/blank_test_cv";
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "GET":
            resolve({ status: 200, json: () => Promise.resolve(url) });
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
  });

  it("should match snapshot", async () => {
    const { container, getByText } = renderWithRouter(<CVCorrection />);
    await waitForElement(() => getByText("Uwagi do CV"));
    expect(container).toMatchSnapshot();
  });

  it("should show message if api fails", async () => {
    failFetch = true;
    const { queryByText, getByText } = renderWithRouter(<CVCorrection />);
    await waitForElement(() => getByText("Uwagi do CV"));
    expect(queryByText("render/media/blank_test_cv")).not.toBeInTheDocument();
  });
});

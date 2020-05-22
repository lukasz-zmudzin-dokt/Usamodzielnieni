import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from "@testing-library/react";
import CorrectionForm from "./CorrectionForm";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AlertContext } from "context";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "abc",
  }),
}));

const renderWithRouter = (
  ui,
  context,
  {
    route = "/cvCorrection/xd",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(
      <AlertContext.Provider value={context}>
        <Router history={history}>{ui}</Router>
      </AlertContext.Provider>
    ),
    history,
  };
};

describe("CorrectionForm", () => {
  let data = { id: "abc", token: "abc" };
  let failFetch = false;
  let alertC = {
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
            resolve({ status: 200 });
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    failFetch = false;
  });

  it("should match snapshot", () => {
    const { container } = renderWithRouter(<CorrectionForm data={data} />);
    expect(container).toMatchSnapshot();
  });

  it("should not send anythhing if fields are empty", async () => {
    const { getByText } = renderWithRouter(<CorrectionForm />, alertC);
    fireEvent.click(getByText("Wyślij uwagi"));

    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Dodaj minimalnie jedną uwagę."
    );
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it("should send if every field is not empty", async () => {
    const { getByText, getByLabelText, history } = renderWithRouter(
      <CorrectionForm />,
      alertC,
      {
        route: "/cvCorrection/abc",
      }
    );

    fireEvent.change(getByLabelText("Dane osobowe"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Edukacja"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Doświadczenie zawodowe"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Umiejętności"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Języki obce"), {
      target: { value: "abcd" },
    });
    fireEvent.change(getByLabelText("Dodatkowe uwagi"), {
      target: { value: "abcd" },
    });
    fireEvent.click(getByText("Wyślij uwagi"));
    await wait(() => {
      expect(fetch).toHaveBeenCalled();
    });
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie przesłano uwagi",
      "success"
    );
    expect(history.location.pathname).toEqual("/cvApproval");
  });

  it("should not send if api fails", async () => {
    failFetch = true;
    const { getByText, getByLabelText } = renderWithRouter(
      <CorrectionForm />,
      alertC
    );
    fireEvent.change(getByLabelText("Dane osobowe"), {
      target: { value: "abcd" },
    });
    fireEvent.click(getByText("Wyślij uwagi"));
    await wait(() => expect(alertC.showAlert).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith("Nie udało się wysłać uwag");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

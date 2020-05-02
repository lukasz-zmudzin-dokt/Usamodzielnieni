import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from "@testing-library/react";
import CVCorrection from "./CVCorrection";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { UserContext } from "context";
import CorrectionForm from "./_components/CorrectionForm";

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
          case "POST":
            resolve({ status: 201 });
            break;
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
    await waitForElement(() => getByText("Wyślij uwagi"));
    expect(container).toMatchSnapshot();
  });

  it("should show message if api fails", async () => {
    failFetch = true;
    const { getByText } = renderWithRouter(<CVCorrection />);
    await waitForElement(() => getByText("Nie udało się pobrać CV."));
    expect(getByText("Nie udało się pobrać CV.")).toBeInTheDocument();
  });
  describe("CorrectionForm", () => {
    it("should not send anythhing if fields are empty", async () => {
      const { getByText } = render(<CorrectionForm />);
      fireEvent.click(getByText("Wyślij uwagi"));
      await waitForElement(() => getByText("Dodaj minimalnie jedną uwagę."));
      expect(getByText("Dodaj minimalnie jedną uwagę.")).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    it("should send if at least one field is not empty", async () => {
      const { getByText, getByLabelText } = renderWithRouter(<CVCorrection />);
      fireEvent.change(getByLabelText("Dane osobowe"), {
        target: { value: "abcd" },
      });
      fireEvent.click(getByText("Wyślij uwagi"));
      await waitForElement(() => getByText("Pomyślnie przesłano uwagi."));
      expect(getByText("Pomyślnie przesłano uwagi.")).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(3);
    });

    it("should send if every field is not empty", async () => {
      const { getByText, getByLabelText } = renderWithRouter(<CVCorrection />);
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
      await waitForElement(() => getByText("Pomyślnie przesłano uwagi."));
      expect(getByText("Pomyślnie przesłano uwagi.")).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(3);
    });

    it("should not send if api fails", async () => {
      failFetch = true;
      const { getByText, getByLabelText } = renderWithRouter(<CVCorrection />);
      fireEvent.change(getByLabelText("Dane osobowe"), {
        target: { value: "abcd" },
      });
      fireEvent.click(getByText("Wyślij uwagi"));
      await waitForElement(() => getByText("Błąd serwera."));
      expect(getByText("Błąd serwera.")).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});

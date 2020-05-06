import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import CorrectionForm from "./CorrectionForm";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const renderWithRouter = (
  ui,
  {
    route = "/cvApproval",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};

describe("CorrectionForm", () => {
  let data = { id: "abc", token: "abc" };
  let failFetch = false;

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
    const { getByText } = renderWithRouter(<CorrectionForm />);
    fireEvent.click(getByText("Wyślij uwagi"));
    await waitForElement(() => getByText("Dodaj minimalnie jedną uwagę."));
    expect(getByText("Dodaj minimalnie jedną uwagę.")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it("should send if at least one field is not empty", async () => {
    const { getByText, getByLabelText } = renderWithRouter(<CorrectionForm />);
    fireEvent.change(getByLabelText("Dane osobowe"), {
      target: { value: "abcd" },
    });
    fireEvent.click(getByText("Wyślij uwagi"));
    await waitForElement(() => getByText("Pomyślnie przesłano uwagi."));
    expect(getByText("Pomyślnie przesłano uwagi.")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should send if every field is not empty", async () => {
    const { getByText, getByLabelText, history } = renderWithRouter(
      <CorrectionForm />
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
    await waitForElement(() => getByText("Pomyślnie przesłano uwagi."));
    expect(getByText("Pomyślnie przesłano uwagi.")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toEqual("/cvApproval");
  });

  it("should not send if api fails", async () => {
    failFetch = true;
    const { getByText, getByLabelText } = renderWithRouter(<CorrectionForm />);
    fireEvent.change(getByLabelText("Dane osobowe"), {
      target: { value: "abcd" },
    });
    fireEvent.click(getByText("Wyślij uwagi"));
    await waitForElement(() => getByText("Błąd serwera."));
    expect(getByText("Błąd serwera.")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

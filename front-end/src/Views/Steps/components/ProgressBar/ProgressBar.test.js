import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import { ProgressBarFragment } from "../";

jest.mock("../");

describe("ProgressBar", () => {
  let apiShouldFail, steps;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiShouldFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({ status: 200, json: () => Promise.resolve(steps) });
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
    jest.clearAllMocks();
    ProgressBarFragment.mockImplementation(({ step }) => (
      <div>{step?.title || "empty"}</div>
    ));
    apiShouldFail = false;
    steps = [
      { id: "1", title: "Krok 1", next: [{ id: "2" }] },
      { id: "2", title: "Krok 2", next: [{ id: "3" }] },
      { id: "3", title: "Krok 3" },
    ];
  });

  it("should render without crashing", async () => {
    const { container, getByText } = render(<ProgressBar />);

    expect(getByText("Ładowanie...")).toBeInTheDocument();

    await waitForElement(() => getByText("Krok 1"));

    expect(container).toMatchSnapshot();
  });

  it("should render error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText } = render(<ProgressBar />);

    await waitForElement(() => getByText("Wystąpił błąd", { exact: false }));

    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
  });

  it("should change path when setCurrent is called", async () => {
    ProgressBarFragment.mockImplementation(({ step, setCurrent }) => (
      <button onClick={() => setCurrent(step.next[0].id)}>
        {step?.title || "empty"}
      </button>
    ));
    const { getByText, queryByText } = render(<ProgressBar />);

    await waitForElement(() => getByText("Krok 1"));
    expect(queryByText("Krok 2")).not.toBeInTheDocument();

    fireEvent.click(getByText("Krok 1"));

    expect(getByText("Krok 1")).toBeInTheDocument();
    expect(getByText("Krok 2")).toBeInTheDocument();
    expect(queryByText("Krok 3")).not.toBeInTheDocument();
  });
});

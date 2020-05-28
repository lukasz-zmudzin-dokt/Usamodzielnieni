import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import { ProgressBarFragment } from "../";
import { UserContext } from "context/UserContext";
import { staffTypes } from "constants/staffTypes";

jest.mock("../");

describe("ProgressBar", () => {
  let apiShouldFail, steps, user;
  beforeAll(() => {
    user = {
      token: "123",
      data: {
        group_type: [],
      },
    };
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
      {
        id: "0",
        parent: null,
        title: "root",
        description: "",
        video: null,
        children: [{ id: "1", title: "Krok 1" }],
        substeps: [],
      },
      {
        id: "1",
        parent: "0",
        title: "Krok 1",
        description: "To jeden z możliwych drugich kroków, jakie możesz wybrać",
        video: null,
        children: [{ id: "2", title: "Krok 2" }],
        substeps: [
          {
            id: "1.1",
            order: 0,
            title: "Podkrok 1.1",
            description:
              "To jest pierwszy podkrok pierwszego kroku, który wyjaśnia, jak masz ten krok ukończyć",
            video: null,
            parent: "1",
          },
          {
            id: "1.2",
            order: 1,
            title: "Podkrok 1.2",
            description:
              "To jest pierwszy podkrok pierwszego kroku, który wyjaśnia, jak masz ten krok ukończyć",
            video: null,
            parent: "1",
          },
        ],
      },
      {
        id: "2",
        parent: "1",
        title: "Krok 2",
        description: "To jeden z możliwych drugich kroków, jakie możesz wybrać",
        video: null,
        children: [],
        substeps: [],
      },
    ];
  });

  it("should render without crashing", async () => {
    const { container, getByText } = render(
      <UserContext.Provider value={user}>
        <ProgressBar />
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Krok 1"));

    expect(container).toMatchSnapshot();
  });

  it("should render error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText } = render(
      <UserContext.Provider value={user}>
        <ProgressBar />
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Wystąpił błąd", { exact: false }));

    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
  });

  /*it("should change path when setCurrent is called", async () => {
    ProgressBarFragment.mockImplementation(({ step, setCurrent }) => (
      <button onClick={() => setCurrent(step.next[0].id)}>
        {step?.title || "empty"}
      </button>
    ));
    const { getByText, queryByText } = render(
    <UserContext.Provider value={user}>
      <ProgressBar />
    </UserContext.Provider>);

    await waitForElement(() => getByText("To jeden z możliwych drugich kroków, jakie możesz wybrać"));
    //expect(queryByText("Podkrok 1.1")).not.toBeInTheDocument();

    fireEvent.click(getByText("Dalej"));

    expect(getByText("Krok 1")).toBeInTheDocument();
    expect(getByText("Podkrok 1.1")).toBeInTheDocument();
    expect(queryByText("Krok 2")).not.toBeInTheDocument();
  });*/
});

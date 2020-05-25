import React from "react";
import { render, waitForElement } from "@testing-library/react";
import TilesContainer from "./TilesContainer";
import { Tile } from "../";

jest.mock("../");

describe("TilesContainer", () => {
  let apiShouldFail, tiles;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiShouldFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({ status: 200, json: () => Promise.resolve(tiles) });
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
    Tile.mockImplementation(({ title }) => <div>{title}</div>);
    apiShouldFail = false;
    tiles = [
      {
        id: "1",
        title: "Telefon zaufania",
        color: "#fff",
        show: {},
        imageUrl: "/foo.png",
        destination: "/contact",
      },
      {
        id: "2",
        title: "Zapytaj",
        color: "#000",
        show: {},
        imageUrl: "/bar.png",
        destination: "/chats",
      },
    ];
  });

  it("should render without crashing", async () => {
    const { container, getByText } = render(<TilesContainer />);

    expect(getByText("Ładowanie menu...")).toBeInTheDocument();
    await waitForElement(() => getByText("Telefon zaufania"));

    expect(container).toMatchSnapshot();
  });

  it("should render error alert when api fails", async () => {
    apiShouldFail = true;
    const { getByText } = render(<TilesContainer />);

    await waitForElement(() => getByText("Nie udało się pobrać menu."));
    expect(getByText("Nie udało się pobrać menu.")).toBeInTheDocument();
  });
});

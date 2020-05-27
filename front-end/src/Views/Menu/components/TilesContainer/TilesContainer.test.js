import React from "react";
import { render, wait } from "@testing-library/react";
import TilesContainer from "./TilesContainer";
import { Tile } from "../";
import {AlertContext} from "context/AlertContext";

jest.mock("../");

describe("TilesContainer", () => {
  let apiShouldFail, tiles, alertC;
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
    alertC = {
      showAlert: jest.fn()
    };
  });

  it("should render without crashing", async () => {
    const { container, getByText } = render(
        <AlertContext.Provider value={alertC}>
          <TilesContainer />
        </AlertContext.Provider>
        );

    //expect(getByText("Ładowanie menu...")).toBeInTheDocument();
    await wait(() => getByText("Telefon zaufania"));

    expect(container).toMatchSnapshot();
  });

  it("should render error alert when api fails", async () => {
    apiShouldFail = true;
    const { getAllByText } = render(
        <AlertContext.Provider value={alertC}>
          <TilesContainer />
        </AlertContext.Provider>
    );

    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith("Wystąpił błąd podczas pobierania menu.");
    //expect(getAllByText("Warsztaty")).toBeInTheDocument();
  });
});

import React from "react";
import { render, wait, fireEvent, act } from "@testing-library/react";
import Tile from "./Tile";
import { MemoryRouter } from "react-router-dom";
import { AlertContext } from "context/AlertContext";
import { staffTypes } from "constants/staffTypes";
import { NewTileForm } from "../";
import { userTypes } from "constants/userTypes";

jest.mock("../");

describe("Tile", () => {
  let props, appendTile, cutTile, apiFail, alertC;

  beforeAll(() => {
    NewTileForm.mockImplementation(() => <div>NewTileForm</div>);
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        if (apiFail) {
          resolve({ status: 500, json: () => Promise.resolve({ e: "e" }) });
        } else {
          resolve({ status: 200 });
        }
      });
    });
  });

  beforeEach(() => {
    appendTile = jest.fn();
    cutTile = jest.fn();
    props = {
      id: 123,
      title: "Tytuł kafelka",
      showImage: { left: true, top: true, right: true },
      imageUrl: "/foo_bar.jpg",
      color: "#fff",
      destination: "/blog/abc123",
      user: {
        type: userTypes.STANDARD,
        // data: {
        //   group_type: [staffTypes.BLOG_MODERATOR],
        // },
      },
    };
    alertC = {
      showAlert: jest.fn(),
    };
  });

  it("should render without crashing", () => {
    const { container } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <Tile {...props} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render without crashing when showImage object is empty", () => {
    props.showImage = {};
    const { container } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <Tile {...props} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render edition modal", () => {
    props.user = {
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.BLOG_MODERATOR],
      },
    };
    const { getByRole, getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <Tile {...props} />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Edytuj"));

    expect(getByRole("dialog")).toBeInTheDocument();
  });

  it("should delete tile", async () => {
    props.user = {
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.BLOG_MODERATOR],
      },
    };
    const { getByText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <Tile {...props} cutTile={cutTile} />
        </MemoryRouter>
      </AlertContext.Provider>
    );
    fireEvent.click(getByText("Usuń"));
    fireEvent.click(getByText("Usuń ✗"));

    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Kafelek usunięty pomyślnie.",
      "success"
    );

    expect(cutTile).toHaveBeenCalledWith(123);
  });

  it("should render preview of tile", () => {
    const { queryByAltText } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <Tile {...props} previewOnly />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    expect(queryByAltText("Edytuj")).not.toBeInTheDocument();
    expect(queryByAltText("Usuń")).not.toBeInTheDocument();
  });
});

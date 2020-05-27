import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import Tile from "./Tile";
import { MemoryRouter } from "react-router-dom";
import {AlertContext} from "context/AlertContext";
import {staffTypes} from "constants/staffTypes";

describe("Tile", () => {
  let props, appendTile, cutTile, apiFail, alertC;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        if (apiFail) {
          resolve({status: 500, json: () => Promise.resolve({e: "e"})})
        } else {
          resolve({status: 200})
        }
      })
    })
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
        data: {
          group_type: [staffTypes.BLOG_MODERATOR]
        }
      }
    };
    alertC = {
      showAlert: jest.fn()
    }
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

  it('should render edition modal', () => {
    const { getByRole, getByAltText } = render(
        <AlertContext.Provider value={alertC}>
          <MemoryRouter>
            <Tile {...props} />
          </MemoryRouter>
        </AlertContext.Provider>
    );

    fireEvent.click(getByAltText("Edytuj"));

    expect(getByRole("dialog")).toBeInTheDocument();
  });

  it('should delete tile', async () => {
    const { getByAltText, getByText } = render(
        <AlertContext.Provider value={alertC}>
          <MemoryRouter>
            <Tile {...props} cutTile={cutTile} />
          </MemoryRouter>
        </AlertContext.Provider>
    );

    fireEvent.click(getByAltText("Usuń"));
    fireEvent.click(getByText("Usuń ✗"));

    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
        "Kafelek usunięty pomyślnie.", "success"
    );

    expect(cutTile).toHaveBeenCalledWith(123);
  });

  it('should render preview of tile', () => {
    const { queryByAltText } = render(
        <AlertContext.Provider value={alertC}>
          <MemoryRouter>
            <Tile {...props} previewOnly/>
          </MemoryRouter>
        </AlertContext.Provider>
    );

    expect(queryByAltText("Edytuj")).not.toBeInTheDocument();
    expect(queryByAltText("Usuń")).not.toBeInTheDocument();
  })
});

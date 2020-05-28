import proxy from "config/api";
import ColorPicker from "components/ColorPicker/ColorPicker";
import React from "react";
import { Tile } from "../index";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";
import { AlertContext } from "context/AlertContext";
import NewTileForm from "./NewTileForm";
import { render, fireEvent, wait } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../");
//jest.mock("components");

describe("NewTileForm", () => {
  let photoFail,
    categoryFail,
    postFail,
    show,
    setShow,
    user,
    appendTile,
    tileData,
    alertC;
  let props;
  beforeAll(() => {
    //ColorPicker.mockImplementation(() => <div/>);
    Tile.mockImplementation(
      (title, color, destination, imageUrl, showImage) => (
        <div>
          {title} {color} {destination} {imageUrl} {showImage}
        </div>
      )
    );
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (photoFail || postFail || categoryFail) {
          resolve({
            status: 500,
            json: () => Promise.resolve({ message: "Błąd serwera." }),
          });
        } else if (init === "GET") {
          resolve({
            status: 200,
            json: () =>
              Promise.resolve([{ id: 1, category: "cat", title: "t" }]),
          });
        } else {
          switch (input) {
            case proxy.menu + "tile/123/photo":
              resolve({ status: 200, json: () => Promise.resolve("") });
              break;
            case proxy.menu + "tile/":
              if (init.method === "POST") {
                resolve({
                  status: 201,
                  json: () => Promise.resolve({ id: 123 }),
                });
              } else {
                resolve({ status: 200, json: () => Promise.resolve("git") });
              }
              break;
            default:
              reject({});
          }
        }
      });
    });
  });

  beforeEach(() => {
    show = true;
    setShow = jest.fn();
    user = {
      token: "123231",
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.BLOG_MODERATOR],
      },
    };
    appendTile = jest.fn();
    tileData = {
      id: 123,
      title: "tytuł",
      color: "#ababab",
      show: { left: true, top: true, right: true },
      imageUrl: "photophotophotophoto",
      destination: "/qwe/qwe/123",
    };
    photoFail = false;
    categoryFail = false;
    postFail = false;
    alertC = {
      showAlert: jest.fn(),
    };
    jest.clearAllMocks();
    props = {
      show: show,
      setShow: setShow,
      user: user,
      appendTile: appendTile,
    };
  });

  it("should match snapshot", () => {
    const { getByRole } = render(
      <AlertContext.Provider value={alertC}>
        <MemoryRouter>
          <NewTileForm {...props} />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    const modal = getByRole("dialog");

    expect(modal).toMatchSnapshot();
  });

  // it('should validate form and append tile', async () => {
  //     const {getByText, getByLabelText} = render(
  //         <AlertContext.Provider value={alertC}>
  //             <MemoryRouter>
  //                 <NewTileForm {...props} />
  //             </MemoryRouter>
  //         </AlertContext.Provider>
  //     );
  //
  //     await expect(fetch).toHaveBeenCalled();
  //
  //     fireEvent.change(getByLabelText("Tytuł kafelka"), {
  //         target: {value: "tytuł"}
  //     });
  //
  //     fireEvent.change(getByLabelText("Ścieżka do kafelka"), {
  //         target: {value: "qwe"}
  //     });
  //
  //     fireEvent.change(getByLabelText("Zdjęcie kafelka", {exact: false}), {
  //         target: {
  //             files: ["dummyValue.something"],
  //         },
  //     });
  //
  //     fireEvent.click(getByText("Dodaj kafelek"));
  //
  //     await wait(() => expect(fetch).toHaveBeenCalled());
  //
  //     expect(alertC.showAlert).toHaveBeenCalledWith(
  //         "Kafelek dodany pomyślnie.", "success"
  //     );
  //
  //     expect(appendTile).toHaveBeenCalledWith({
  //         id: 123,
  //         title: "tytuł",
  //         destination: "qwe",
  //         color: "#fafafa",
  //         show: {left: false, top: false, right: false},
  //         imageUrl: expect.anything()
  //     });
  // });
  //
  // it('should fill form with values on edit', () => {
  //     const {getByText, getByLabelText} = render(
  //         <AlertContext.Provider value={alertC}>
  //             <MemoryRouter>
  //                 <NewTileForm {...props} tileData={tileData}/>
  //             </MemoryRouter>
  //         </AlertContext.Provider>
  //     );
  //
  //     expect(getByLabelText("Tytuł kafelka").value).toBe("tytuł");
  //     expect(getByLabelText("Ścieżka do kafelka").value).toBe("/qwe/qwe/123");
  //     //expect(getByLabelText("Zdjęcie kafelka").files).toBe("photophotophotophoto");
  // });
});

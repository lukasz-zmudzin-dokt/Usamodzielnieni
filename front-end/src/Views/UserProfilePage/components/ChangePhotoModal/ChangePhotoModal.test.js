import React from "react";
import {
  render,
  wait,
  waitForElement,
  waitForElementToBeRemoved,
  queries,
  fireEvent,
} from "@testing-library/react";
import { AlertContext } from "context";
import ChangePhotoModal from "./ChangePhotoModal";

describe("ChangePhotoModal", () => {
  let props, apiShouldFail, alertContext;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiShouldFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({ status: 200, json: () => Promise.resolve("/url") });
              break;
            default:
              reject({});
              break;
          }
        }
      });
    });
    alertContext = { showAlert: jest.fn() };
  });

  beforeEach(() => {
    jest.clearAllMocks();
    props = {
      show: true,
      setShow: jest.fn(),
      user: {
        token: "abc123",
        data: {
          picture_url: null,
        },
        changeData: jest.fn(),
      },
    };
    apiShouldFail = false;
  });

  it("should render without crashing", async () => {
    const { getByRole } = render(<ChangePhotoModal {...props} />);
    const modal = getByRole("dialog");

    await waitForElement(() => queries.getByText(modal, "Zdjęcie:"));

    expect(modal).toMatchSnapshot();
  });

  it("should render invalid feedback when submit button is clicked and input is empty", async () => {
    const { getByRole } = render(<ChangePhotoModal {...props} />);
    const modal = getByRole("dialog");

    await waitForElement(() => queries.getByText(modal, "Zdjęcie:"));
    fireEvent.click(queries.getByText(modal, "Prześlij"));

    expect(modal).toMatchSnapshot();
  });

  it("should close modal when cancel button is clicked", async () => {
    const { getByRole, queryByRole } = render(<ChangePhotoModal {...props} />);
    const modal = getByRole("dialog");

    await waitForElement(() => queries.getByText(modal, "Zdjęcie:"));
    fireEvent.click(queries.getByText(modal, "Anuluj"));

    waitForElementToBeRemoved(() => queryByRole("dialog"));
  });

  // it("should render invalid feedback when submit button is clicked and input is empty", async () => {
  //   const { getByRole } = render(
  //     <AlertContext.Provider value={alertContext}>
  //       <ChangePhotoModal {...props} />
  //     </AlertContext.Provider>
  //   );
  //   const modal = getByRole("dialog");

  //   await waitForElement(() => queries.getByText(modal, "Zdjęcie:"));

  //   const inputEl = queries.getByLabelText(modal, "Zdjęcie:");
  //   const file = new File(["(⌐□_□)"], "photo.png", {
  //     type: "image/png",
  //   });
  //   Object.defineProperty(inputEl, "files", {
  //     value: [file],
  //   });
  //   Object.defineProperty(inputEl, "value", {
  //     value: "C:\\fakepath\\photo.png",
  //   });
  //   fireEvent.change(inputEl);

  //   await waitForElement(() => queries.getByLabelText(modal, "photo.png"));
  //   const test = queries.getByLabelText(modal, "photo.png");
  //   const test2 = queries.getByText(modal, "photo.png");

  //   fireEvent.click(queries.getByText(modal, "Prześlij"));

  //   const msg = "Pomyślnie przesłano nowe zdjęcie.";
  //   await wait(() => expect(alertContext.showAlert).toHaveBeenCalled());
  //   expect(alertContext.showAlert).toHaveBeenCalledWith(msg);
  // });
});

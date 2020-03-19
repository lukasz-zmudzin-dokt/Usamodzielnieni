import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OfferForm from "Views/OfferForm";
import renderer from "react-test-renderer";

describe("OfferForm", () => {
  let token;
  let failFetch;
  beforeAll(() => {
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "POST":
            resolve({ status: 200 });
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
  });

  it("renders correctly", () => {
    const form = renderer.create(<OfferForm />).toJSON();
    expect(form).toMatchSnapshot();
  });

  it("should return apropriate message when offer is send", async () => {
    const location = { pathname: "/" };
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <OfferForm location={location} token={token} />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Nazwa stanowiska"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByPlaceholderText("Adres firmy"), {
      target: { value: "abcd" }
    });
    fireEvent.change(getByTestId("voivodeship"), {
      target: { value: "lubelskie" }
    });
    fireEvent.change(getByTestId("description"), { target: { value: "abcd" } });
    // fireEvent.change(getByLabelText("Ważne do:"), {
    //   target: { value: "abcd" }
    // });

    fireEvent.click(getByTestId("submitBtn"));
    await waitForElement(() =>
      expect(getByTestId("sendMsg")).toBeInTheDocument()
    );
    // expect(fetch).toHaveBeenCalledTimes(1);
  });
});

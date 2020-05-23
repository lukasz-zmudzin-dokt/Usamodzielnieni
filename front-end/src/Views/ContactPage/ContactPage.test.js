import React from "react";
import ContactPage from "./ContactPage";
import { render, wait } from "@testing-library/react";
import { AlertContext } from "context/AlertContext";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";

describe("ContactPage", () => {
  let apiFail, phoneList, user, alertC;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 200, json: () => Promise.resolve(phoneList) });
        }
      });
    });
  });

  beforeEach(() => {
    phoneList = [
      {
        id: 1,
        title: "qwe",
        phone_number: "123123123",
      },
      {
        id: 2,
        title: "asd",
        phone_number: "321321321",
      },
    ];
    apiFail = false;
    user = {
      type: userTypes.STAFF,
      token: 123,
      data: {
        group_type: [staffTypes.BLOG_MODERATOR],
      },
    };
    alertC = {
      showAlert: jest.fn(),
    };
  });

  it("should match snapshot", async () => {
    const { container } = render(<ContactPage />);
    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(container).toMatchSnapshot();
  });

  it("should set error on api fail", async () => {
    apiFail = true;
    render(
      <AlertContext.Provider value={alertC}>
        <ContactPage />
      </AlertContext.Provider>
    );
    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas pobierania listy kontaktów."
    );
  });

  it("should render alert on no phoneCards", async () => {
    phoneList = [];
    const { getByText } = render(<ContactPage />);
    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(getByText("Brak kontaktów do wyświetlenia.")).toBeInTheDocument();
  });
});

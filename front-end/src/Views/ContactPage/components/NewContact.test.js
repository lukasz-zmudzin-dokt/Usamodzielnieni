import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";
import { render, fireEvent, wait } from "@testing-library/react";
import { NewContact } from "./NewContact";
import React from "react";

describe("NewContact test", () => {
  let apiFail, user, show, setShow, setContacts, alertC;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 201, json: () => Promise.resolve({ id: "asd" }) });
        }
      });
    });
  });

  beforeEach(() => {
    user = {
      token: 123,
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.BLOG_MODERATOR],
      },
    };
    show = true;
    setShow = jest.fn();
    setContacts = jest.fn();
    alertC = {
      showAlert: jest.fn(),
    };
  });

  it("should match snapshot", async () => {
    const { container } = render(
      <NewContact
        user={user}
        show={show}
        setShow={setShow}
        setContacts={setContacts}
        alertC={alertC}
      />
    );

    await expect(container).toMatchSnapshot();
  });

  it("should validate form and submit phone", async () => {
    const { getByLabelText, getByText } = render(
      <NewContact
        user={user}
        show={show}
        setShow={setShow}
        setContacts={setContacts}
        alertC={alertC}
      />
    );

    fireEvent.change(getByLabelText("Nazwa kontaktu"), {
      target: { value: "qweqwe" },
    });
    fireEvent.change(getByLabelText("Numer telefonu"), {
      target: { value: "123123123" },
    });
    fireEvent.click(getByText("Dodaj"));

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie dodano kontakt",
      "success"
    );

    expect(setContacts).toHaveBeenCalledWith({
      id: "asd",
      name: "qweqwe",
      phone: "123123123",
    });
  });

  it("should render alert on api fail", async () => {
    apiFail = true;
    const { getByLabelText, getByText } = render(
      <NewContact
        user={user}
        show={show}
        setShow={setShow}
        setContacts={setContacts}
        alertC={alertC}
      />
    );

    fireEvent.change(getByLabelText("Nazwa kontaktu"), {
      target: { value: "qweqwe" },
    });
    fireEvent.change(getByLabelText("Numer telefonu"), {
      target: { value: "123123123" },
    });
    fireEvent.click(getByText("Dodaj"));

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas dodawania kontaktu."
    );
  });
});

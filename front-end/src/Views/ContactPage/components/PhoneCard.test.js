import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from "@testing-library/react";
import PhoneCard from "./PhoneCard";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";

describe("PhoneCard", () => {
  let apiFail, contact, user, cutItem, alertC, notFound;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else if (notFound) {
          resolve({ status: 404 });
        } else {
          resolve({ status: 200, json: () => Promise.resolve("git") });
        }
      });
    });
  });

  beforeEach(() => {
    apiFail = false;
    notFound = false;
    contact = {
      id: 1,
      name: "qwe",
      phone: "123",
    };
    user = {
      token: 123,
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.BLOG_MODERATOR],
      },
    };
    cutItem = jest.fn();
    alertC = {
      showAlert: jest.fn(),
    };
  });

  global.document.execCommand = jest.fn();

  it("should render without crashing", () => {
    const { getByText } = render(
      <PhoneCard
        contact={contact}
        user={user}
        cutItem={cutItem}
        alertC={alertC}
      />
    );
    expect(getByText("qwe")).toBeInTheDocument();
    expect(getByText("123")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <PhoneCard
        contact={contact}
        user={user}
        cutItem={cutItem}
        alertC={alertC}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should copy text on click", async () => {
    const { getByText } = render(
      <PhoneCard
        contact={contact}
        user={user}
        cutItem={cutItem}
        alertC={alertC}
      />
    );
    fireEvent.click(getByText("Skopiuj ten numer"));
    expect(getByText("Skopiowano")).toBeInTheDocument();

    await waitForElement(() => getByText("Skopiuj ten numer"));
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });

  it("should delete item and call cutItem", async () => {
    const { getByText } = render(
      <PhoneCard
        contact={contact}
        user={user}
        cutItem={cutItem}
        alertC={alertC}
      />
    );
    fireEvent.click(getByText("X"));
    fireEvent.click(getByText("Usuń ✗"));

    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Pomyślnie usunięto kartę kontaktu.",
      "success"
    );
    expect(cutItem).toHaveBeenCalledWith(contact.id);
  });

  it("should render alert on api fail", async () => {
    apiFail = true;
    const { getByText } = render(
      <PhoneCard
        contact={contact}
        user={user}
        cutItem={cutItem}
        alertC={alertC}
      />
    );
    fireEvent.click(getByText("X"));
    fireEvent.click(getByText("Usuń ✗"));

    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas usuwania karty kontaktu."
    );
  });

  it("should render alert if card was not found", async () => {
    notFound = true;
    const { getByText } = render(
      <PhoneCard
        contact={contact}
        user={user}
        cutItem={cutItem}
        alertC={alertC}
      />
    );
    fireEvent.click(getByText("X"));
    fireEvent.click(getByText("Usuń ✗"));

    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Ta karta została już usunięta."
    );
  });
});

import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";
import { VIDEOBLOG_CATEGORY } from "constants/videoBlogInitialValues";
import VideoBlog from "./VideoBlog";
import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { AlertContext } from "context/AlertContext";
import { Player } from "components";

jest.mock("components/Player");

describe("VideoBlog", () => {
  let apiFail, user, post, content, alertC;

  beforeAll(() => {
    Player.mockImplementation(() => <div>Player</div>);
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 200, json: () => Promise.resolve("") });
        }
      });
    });
  });

  beforeEach(() => {
    apiFail = false;
    user = {
      token: 123,
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.BLOG_CREATOR],
      },
    };
    content = [
      {
        id: "1",
        url: "h.t.t.p",
        description: "jeden",
      },
      {
        id: "2",
        url: "qweewq",
        description: "dwa",
      },
    ];
    post = {
      header: null,
      title: "tytuł",
      category: VIDEOBLOG_CATEGORY,
      content: JSON.stringify(content),
      tags: [],
    };
    alertC = {
      showAlert: jest.fn(),
    };
  });

  it("should match snapshot", () => {
    const { container } = render(<VideoBlog postString={post} user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should render button for blog creator and show modal", () => {
    const { getByText } = render(<VideoBlog postString={post} user={user} />);

    expect(getByText("Dodaj kartę")).toBeInTheDocument();
    fireEvent.click(getByText("Dodaj kartę"));
    expect(getByText("Nowa karta wideo")).toBeInTheDocument();
  });

  it("should validate form and add new card", async () => {
    const { getByText, getByLabelText } = render(
      <AlertContext.Provider value={alertC}>
        <VideoBlog postString={post} user={user} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Dodaj kartę"));
    fireEvent.change(getByLabelText("URL do filmu"), {
      target: { value: "url" },
    });
    fireEvent.change(getByLabelText("Opis"), {
      target: { value: "opis bardzo dobry" },
    });
    fireEvent.click(getByText("Zatwierdź kartę"));

    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Zmiany zostały pomyślnie wprowadzone.",
      "success"
    );
    expect(getByText("opis bardzo dobry")).toBeInTheDocument();
  });

  it("should render alert on api fail", async () => {
    apiFail = true;
    const { getByText, getByLabelText } = render(
      <AlertContext.Provider value={alertC}>
        <VideoBlog postString={post} user={user} />
      </AlertContext.Provider>
    );

    fireEvent.click(getByText("Dodaj kartę"));
    fireEvent.change(getByLabelText("URL do filmu"), {
      target: { value: "qweqwe" },
    });
    fireEvent.change(getByLabelText("Opis"), {
      target: { value: "bardzo pyszna kawa" },
    });
    fireEvent.click(getByText("Zatwierdź kartę"));

    await wait(() => expect(fetch).toHaveBeenCalled());
    expect(getByLabelText("URL do filmu").value).not.toBe("");
    expect(getByLabelText("Opis").value).not.toBe("");
    expect(alertC.showAlert).toHaveBeenCalledWith(
      "Wystąpił błąd podczas dodawania nowej karty"
    );
  });
});

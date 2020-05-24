import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import MyOfferPerson from "./MyOfferPerson";
import { MemoryRouter } from "react-router-dom";
import proxy from "config/api";

describe("MyOffersPerson", () => {
  let fetchType;
  let testPerson = {
    cv_url: "/media/blank_test_cv",
    date_posted: "2020-04-06T01:34:27.899000+02:00",
    email: "standard1@standard1.com",
    first_name: "standard1",
    job_offer: "47991e86-4b42-4507-b154-1548bf8a3bd3",
    last_name: "standard1",
    user_id: "b582b042-d6d8-4e57-9447-564a6748b4f7",
    was_read: false
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        switch (fetchType) {
          case "fail":
            resolve({ status: 500 });
            break;
          case "ok":
            resolve({ status: 200, json: () => Promise.resolve("lol ok") });
            break;
          default:
            reject([]);
        }
      });
    });
  });

  beforeAll(() => {
    global.open = jest.fn();
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <MyOfferPerson person={testPerson} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("standard1 standard1"));
    expect(container).toMatchSnapshot();
  });

  it("should display a person", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MyOfferPerson person={testPerson} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Pokaż CV"));
    expect(getByText("standard1 standard1")).toBeInTheDocument();
  });

  it("should want to open new tab", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MyOfferPerson person={testPerson} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Pokaż CV"));
    fireEvent.click(getByText("Pokaż CV"));
    expect(open).toHaveBeenCalledTimes(1);
  });

  it("should open new tab with proper cv url", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MyOfferPerson person={testPerson} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Pokaż CV"));
    fireEvent.click(getByText("Pokaż CV"));
    expect(open).toHaveBeenCalledWith(
      proxy.plain + "/media/blank_test_cv",
      "_blank"
    );
  });

  it("should be not read", async () => {
    const { container, getByText } = render(
        <MemoryRouter>
          <MyOfferPerson person={testPerson} />
        </MemoryRouter>
    );
    await waitForElement(() => getByText("Oznacz jako przeczytane"));
    expect(container.firstChild).toHaveClass('not-read');
  });

  it("should mark applicant as read and unread", async () => {
    fetchType = "ok";
    const { container, getByText } = render(
        <MemoryRouter>
          <MyOfferPerson person={testPerson} />
        </MemoryRouter>
    );
    await waitForElement(() => getByText("Oznacz jako przeczytane"));
    fireEvent.click(getByText("Oznacz jako przeczytane"));
    await waitForElement(() => getByText("Oznacz jako nieprzeczytane"));
    expect(container.firstChild).not.toHaveClass('not-read');
    fireEvent.click(getByText("Oznacz jako nieprzeczytane"));
    await waitForElement(() => getByText("Oznacz jako przeczytane"));
    expect(container.firstChild).toHaveClass('not-read');
  });

});

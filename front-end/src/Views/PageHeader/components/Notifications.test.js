import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Notifications from "./Notifications";
import { MemoryRouter } from "react-router-dom";
import { queries } from "@testing-library/dom";

describe("Notifications", () => {
  let apiNotifications;
  let apiShouldFail;
  let token;
  beforeAll(() => {
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiShouldFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "DELETE":
              resolve({ status: 200 });
              break;
            case "GET":
              resolve({
                status: 200,
                json: () => Promise.resolve(apiNotifications),
              });
              break;
            default:
              reject({});
              break;
          }
        }
      });
    });
  });
  beforeEach(() => {
    apiShouldFail = false;
    apiNotifications = [];
  });

  it("should render without crashing", async () => {
    const location = { pathname: "/" };
    const { container, getByText } = render(
      <MemoryRouter>
        <Notifications location={location} token={token} />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Powiadomienia", { exact: false }));

    expect(container).toMatchSnapshot();
  });

  it("should open notifications list when toggle is clicked and api returns list with 2 objects", async () => {
    apiNotifications = [
      { id: "1", type: "cv", title: "Rozpatrzono CV", time: 1584207570892 },
      {
        id: "2",
        type: "jobs",
        title: "Dostępne nowe oferty pracy",
        time: 1584207570792,
      },
    ];
    const location = { pathname: "/user" };
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <Notifications location={location} token={token} />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Rozpatrzono CV"));

    expect(getByTestId("dropdownMenu")).toMatchSnapshot();
  });

  it("should open empty notifications list when toggle is clicked and api returns empty list", async () => {
    const location = { pathname: "/" };
    const { getByText } = render(
      <MemoryRouter>
        <Notifications location={location} token={token} />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Brak powiadomień"));

    expect(getByText("Brak powiadomień")).toBeInTheDocument();
  });

  it("should open empty notifications list when toggle is clicked and api returns error status", async () => {
    apiShouldFail = true;
    const location = { pathname: "/" };
    const { getByText } = render(
      <MemoryRouter>
        <Notifications location={location} token={token} />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Brak powiadomień"));

    expect(getByText("Brak powiadomień")).toBeInTheDocument();
  });

  it("should remove one notification when removeButton is clicked", async () => {
    apiNotifications = [
      { id: "1", type: "cv", title: "Rozpatrzono CV", time: 1584207570892 },
      {
        id: "2",
        type: "jobs",
        title: "Dostępne nowe oferty pracy",
        time: 1584207570792,
      },
      {
        id: "3",
        type: "jobs",
        title: "Nowe oferty pasujące do twoich umiejętności",
        time: 1584207570792,
      },
    ];
    const location = { pathname: "/user" };
    const { getByText, getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <Notifications location={location} token={token} />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Dostępne nowe oferty pracy"));
    const notificationItem = getByTestId("dropdownItem2");
    fireEvent.click(queries.getByText(notificationItem, "X"));

    expect(getByTestId("dropdownItem1")).toBeInTheDocument();
    expect(queryByTestId("dropdownItem2")).not.toBeInTheDocument();
    expect(getByTestId("dropdownItem3")).toBeInTheDocument();
  });

  it("should remove notification when location path matches notification type", async () => {
    apiNotifications = [
      { id: "1", type: "cv", title: "Rozpatrzono CV", time: 1584207570892 },
      {
        id: "2",
        type: "jobs",
        title: "Dostępne nowe oferty pracy",
        time: 1584207570792,
      },
      {
        id: "3",
        type: "jobs",
        title: "Nowe oferty pasujące do twoich umiejętności",
        time: 1584207570792,
      },
    ];
    const location = { pathname: "/cvEditor" };
    const { getByText, getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <Notifications location={location} token={token} />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Dostępne nowe oferty pracy"));

    expect(queryByTestId("dropdownItem1")).not.toBeInTheDocument();
    expect(getByTestId("dropdownItem2")).toBeInTheDocument();
    expect(getByTestId("dropdownItem3")).toBeInTheDocument();
  });

  it("should remove all notifications when clearButton is clicked", async () => {
    apiNotifications = [
      { id: "1", type: "cv", title: "Rozpatrzono CV", time: 1584207570892 },
      {
        id: "2",
        type: "jobs",
        title: "Dostępne nowe oferty pracy",
        time: 1584207570792,
      },
      {
        id: "3",
        type: "jobs",
        title: "Nowe oferty pasujące do twoich umiejętności",
        time: 1584207570792,
      },
    ];
    const location = { pathname: "/user" };
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <Notifications location={location} token={token} />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Wyczyść"));
    fireEvent.click(getByText("Wyczyść"));

    expect(
      queryByTestId("dropdownItem", { exact: false })
    ).not.toBeInTheDocument();
    expect(getByText("Brak powiadomień")).toBeInTheDocument();
  });

  it("should ignore api error when clearButton is clicked and api returns error status", async () => {
    apiShouldFail = true;
    apiNotifications = [
      { id: "1", type: "cv", title: "Rozpatrzono CV", time: 1584207570892 },
      {
        id: "2",
        type: "jobs",
        title: "Dostępne nowe oferty pracy",
        time: 1584207570792,
      },
      {
        id: "3",
        type: "jobs",
        title: "Nowe oferty pasujące do twoich umiejętności",
        time: 1584207570792,
      },
    ];
    const location = { pathname: "/user" };
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <Notifications location={location} token={token} />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Wyczyść"));
    fireEvent.click(getByText("Wyczyść"));

    expect(
      queryByTestId("dropdownItem", { exact: false })
    ).not.toBeInTheDocument();
    expect(getByText("Brak powiadomień")).toBeInTheDocument();
  });
});

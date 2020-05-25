import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Notifications from "./Notifications";
import { MemoryRouter } from "react-router-dom";
import { queries } from "@testing-library/dom";
import { NotificationsContext } from "context";

describe("Notifications", () => {
  let notificationsContext;

  beforeEach(() => {
    notificationsContext = {
      notifications: [],
      count: 0,
      error: false,
      next: undefined,
      deleteNotifications: jest.fn(),
      deleteNotification: jest.fn(),
      markAsRead: jest.fn(),
      loadMoreNotifications: jest.fn(),
    };
  });

  it("should render without crashing", async () => {
    const location = { pathname: "/" };
    const { container, getByText } = render(
      <NotificationsContext.Provider value={notificationsContext}>
        <MemoryRouter>
          <Notifications location={location} />
        </MemoryRouter>
      </NotificationsContext.Provider>
    );

    await waitForElement(() => getByText("Powiadomienia", { exact: false }));

    expect(container).toMatchSnapshot();
  });

  it("should open notifications list when toggle is clicked and api returns list with 2 objects", async () => {
    notificationsContext = {
      ...notificationsContext,
      notifications: [
        {
          id: "1",
          path: "/cv",
          title: "Rozpatrzono CV",
          time: new Date(1584207570892),
        },
        {
          id: "2",
          path: "/jobs",
          title: "Dostępne nowe oferty pracy",
          time: new Date(1584207570792),
        },
      ],
    };
    const location = { pathname: "/user" };
    const { getByText, getByTestId } = render(
      <NotificationsContext.Provider value={notificationsContext}>
        <MemoryRouter>
          <Notifications location={location} />
        </MemoryRouter>
      </NotificationsContext.Provider>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Rozpatrzono CV"));

    expect(getByTestId("dropdownMenu")).toMatchSnapshot();
  });

  it("should open empty notifications list when toggle is clicked and api returns empty list", async () => {
    const location = { pathname: "/" };
    const { getByText } = render(
      <NotificationsContext.Provider value={notificationsContext}>
        <MemoryRouter>
          <Notifications location={location} />
        </MemoryRouter>
      </NotificationsContext.Provider>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Brak powiadomień"));

    expect(getByText("Brak powiadomień")).toBeInTheDocument();
  });

  it("should open empty notifications list when toggle is clicked and api returns error status", async () => {
    notificationsContext.error = true;
    const location = { pathname: "/" };
    const { getByText } = render(
      <NotificationsContext.Provider value={notificationsContext}>
        <MemoryRouter>
          <Notifications location={location} />
        </MemoryRouter>
      </NotificationsContext.Provider>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() =>
      getByText("Wystąpił błąd w trakcie ładowania powiadomień")
    );

    expect(
      getByText("Wystąpił błąd w trakcie ładowania powiadomień")
    ).toBeInTheDocument();
  });

  it("should remove one notification when removeButton is clicked", async () => {
    notificationsContext.notifications = [
      {
        id: "1",
        path: "/cv",
        title: "Rozpatrzono CV",
        time: new Date(1584207570892),
      },
      {
        id: "2",
        path: "/jobs",
        title: "Dostępne nowe oferty pracy",
        time: new Date(1584207570792),
      },
      {
        id: "3",
        path: "/jobs",
        title: "Nowe oferty pasujące do twoich umiejętności",
        time: new Date(1584207570792),
      },
    ];
    const location = { pathname: "/user" };
    const { getByText, getByTestId } = render(
      <NotificationsContext.Provider value={notificationsContext}>
        <MemoryRouter>
          <Notifications location={location} />
        </MemoryRouter>
      </NotificationsContext.Provider>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Dostępne nowe oferty pracy"));
    const notificationItem = getByTestId("dropdownItem2");
    fireEvent.click(queries.getByText(notificationItem, "X"));

    expect(notificationsContext.deleteNotification).toHaveBeenCalledWith("2");
  });

  it("should remove notification when location path matches notification type", async () => {
    notificationsContext.notifications = [
      {
        id: "1",
        path: "/cv",
        title: "Rozpatrzono CV",
        time: new Date(1584207570892),
      },
      {
        id: "2",
        path: "/jobs",
        title: "Dostępne nowe oferty pracy",
        time: new Date(1584207570792),
      },
      {
        id: "3",
        path: "/jobs",
        title: "Nowe oferty pasujące do twoich umiejętności",
        time: new Date(1584207570792),
      },
    ];
    const location = { pathname: "/cv" };
    const { getByText } = render(
      <NotificationsContext.Provider value={notificationsContext}>
        <MemoryRouter>
          <Notifications location={location} />
        </MemoryRouter>
      </NotificationsContext.Provider>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Dostępne nowe oferty pracy"));

    expect(notificationsContext.deleteNotification).toHaveBeenCalledWith("1");
  });

  it("should remove all notifications when clearButton is clicked", async () => {
    notificationsContext.notifications = [
      {
        id: "1",
        path: "/cv",
        title: "Rozpatrzono CV",
        time: new Date(1584207570892),
      },
      {
        id: "2",
        path: "/jobs",
        title: "Dostępne nowe oferty pracy",
        time: new Date(1584207570792),
      },
      {
        id: "3",
        path: "/jobs",
        title: "Nowe oferty pasujące do twoich umiejętności",
        time: new Date(1584207570792),
      },
    ];
    const location = { pathname: "/user" };
    const { getByText } = render(
      <NotificationsContext.Provider value={notificationsContext}>
        <MemoryRouter>
          <Notifications location={location} />
        </MemoryRouter>
      </NotificationsContext.Provider>
    );

    fireEvent.click(getByText("Powiadomienia", { exact: false }));
    await waitForElement(() => getByText("Wyczyść"));
    fireEvent.click(getByText("Wyczyść"));

    expect(notificationsContext.deleteNotifications).toHaveBeenCalled();
  });
});

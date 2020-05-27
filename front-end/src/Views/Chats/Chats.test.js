import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import Chats from "Views/Chats";

import { ChatContext } from "context";

jest.mock("./components", () => ({
  ChatInfo: ({ chat }) => <div>{chat.first.username}</div>,
  ContactsModalContent: () => <div>Modal</div>,
}));
jest.mock("components", () => ({
  Pagination: () => <div>Pagination</div>,
}));

describe("Chats", () => {
  let chatC = {
    chats: [
      {
        id: "12",
        first: { username: "xd", first_name: "czesiek", last_name: "xd" },
        second: { username: "xd2", first_name: "czesiek2", last_name: "xd2" },
        updated: "2020-05-25T19:22:37.720364+02:00",
      },
      {
        id: "13",
        first: { username: "xd1", first_name: "czesiek", last_name: "xd" },
        second: { username: "xd2", first_name: "czesiek2", last_name: "xd2" },
        updated: "2020-06-25T19:22:37.720364+02:00",
      },
    ],
    error: false,
    count: 2,
    loadMoreMessages: jest.fn(),
    isChatLoading: false,
  };

  beforeEach(() => {
    chatC = {
      chats: [
        {
          id: "12",
          first: { username: "xd", first_name: "czesiek", last_name: "xd" },
          second: { username: "xd2", first_name: "czesiek2", last_name: "xd2" },
          updated: "2020-05-25T19:22:37.720364+02:00",
        },
        {
          id: "13",
          first: { username: "xd1", first_name: "czesiek", last_name: "xd" },
          second: { username: "xd2", first_name: "czesiek2", last_name: "xd2" },
          updated: "2020-06-25T19:22:37.720364+02:00",
        },
      ],
      error: false,
      count: 2,
      isChatsLoading: false,
      loadMoreMessages: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("should render without crashing", async () => {
    const { container, getByText } = render(
      <ChatContext.Provider value={chatC}>
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </ChatContext.Provider>
    );

    await waitForElement(() => getByText("xd"));

    expect(container).toMatchSnapshot();
  });

  it("should render loading alert when component is waiting for api response", async () => {
    chatC.isChatsLoading = true;
    chatC.chats = [];
    const { getByText } = render(
      <ChatContext.Provider value={chatC}>
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </ChatContext.Provider>
    );

    expect(
      getByText("Ładowanie wiadomości.", { exact: false })
    ).toBeInTheDocument();
  });

  it("should render info alert when api returns empty list", async () => {
    chatC = {
      chats: [],
      error: false,
      count: 0,
      isChatsLoading: false,
      loadMoreMessages: jest.fn(),
    };

    const { getByText, queryByText } = render(
      <ChatContext.Provider value={chatC}>
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </ChatContext.Provider>
    );

    await waitForElement(() => getByText("Brak wiadomości", { exact: false }));
    expect(getByText("Brak wiadomości", { exact: false })).toBeInTheDocument();
    expect(queryByText("xd")).not.toBeInTheDocument();
  });

  it("should open contacts modal when button is clicked", async () => {
    const { getByText } = render(
      <ChatContext.Provider value={chatC}>
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </ChatContext.Provider>
    );
    await waitForElement(() => getByText("Nowa wiadomość"));
    fireEvent.click(getByText("Nowa wiadomość"));

    await waitForElement(() => getByText("Wybierz osobę"));
  });

  it("should render error alert when api returns error", async () => {
    chatC.error = true;
    chatC.chats = [];
    chatC.count = 0;
    const { getByText, queryByText } = render(
      <ChatContext.Provider value={chatC}>
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </ChatContext.Provider>
    );

    await waitForElement(() => getByText("Wystąpił błąd", { exact: false }));
    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
    expect(queryByText("xd")).not.toBeInTheDocument();
  });
});

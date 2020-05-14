import { fireEvent, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import React from "react";
import { UserContext } from "context/UserContext";
import { createMemoryHistory } from "history";
import UserInfo from "./UserInfo";

const renderWithRouter = (
  ui,
  {
    route = `/userList`,
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = { type: "Staff" };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <Router history={history}>{ui}</Router>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("UserInfo", () => {
  let user = {
    id: 1,
    username: "user1",
    date_joined: "2020-05-12",
    email: "qwe@qwe.qwe",
    type: "Standard",
    status: "Verified",
  };

  it("should match snapshot", () => {
    const { container } = renderWithRouter(<UserInfo user={user} />);

    expect(container).toMatchSnapshot();
  });

  it("should redirect to chat", () => {
    const { history, getByText } = renderWithRouter(<UserInfo user={user} />);
    fireEvent.click(getByText("Wyślij wiadomość"));

    expect(history.location.pathname).toEqual("/chats/1");
  });
});

import { fireEvent, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import React from "react";
import { UserContext } from "context/UserContext";
import { createMemoryHistory } from "history";
import UserInfo from "./UserInfo";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";
import ButtonsContainer from "./ButtonsContainer";

jest.mock("./ButtonsContainer");

const renderWithRouter = (
  ui,
  {
    route = `/userList`,
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = { type: userTypes.STAFF };
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
  let props = {
    user: {
      id: 1,
      username: "user1",
      dateJoined: new Date("2020-05-12"),
      email: "qwe@qwe.qwe",
      type: userTypes.STANDARD,
      status: userStatuses.VERIFIED,
    },
    mapType: (type) => type,
    mapStatus: (status) => status,
  };
  beforeEach(() => {
    jest.clearAllMocks();
    ButtonsContainer.mockImplementation(({ disabled }) => (
      <div>ButtonsContainer</div>
    ));
  });

  it("should match snapshot", () => {
    const { container } = renderWithRouter(<UserInfo {...props} />);

    expect(container).toMatchSnapshot();
  });
});

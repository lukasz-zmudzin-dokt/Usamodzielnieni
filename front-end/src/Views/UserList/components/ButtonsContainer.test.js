import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { userStatuses } from "constants/userStatuses";
import { userTypes } from "constants/userTypes";
import { UserContext } from "context/UserContext";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ButtonsContainer from "./ButtonsContainer";
import BlockAccountButton from "./BlockAccountButton";
import UnblockAccountButton from "./UnblockAccountButton";
import DeleteAccountButton from "./DeleteAccountButton";

jest.mock("./BlockAccountButton");
jest.mock("./UnblockAccountButton");
jest.mock("./DeleteAccountButton");

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

describe("ButtonsContainer", () => {
  let apiShouldFail;
  let props;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiShouldFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "POST":
              resolve({ status: 200 });
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
    jest.clearAllMocks();
    BlockAccountButton.mockImplementation(() => (
      <button>BlockAccountButton</button>
    ));
    UnblockAccountButton.mockImplementation(() => (
      <button>UnblockAccountButton</button>
    ));
    DeleteAccountButton.mockImplementation(({ disabled }) => (
      <button disabled={disabled}>DeleteAccountButton</button>
    ));
    apiShouldFail = false;
    props = {
      user: {
        id: 1,
        token: "123",
        logout: jest.fn(),
        status: userStatuses.VERIFIED,
      },
      setUser: jest.fn(),
      deleteUser: jest.fn(),
    };
  });

  it("should render without crashing", async () => {
    const { container } = render(
      <MemoryRouter>
        <ButtonsContainer {...props} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render unblock buttons when user status is blocked", async () => {
    props.user.status = userStatuses.BLOCKED;
    const { container } = render(
      <MemoryRouter>
        <ButtonsContainer {...props} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should not render block and delete buttons when user type is staff", async () => {
    props.user.type = userTypes.STAFF;
    const { container } = render(
      <MemoryRouter>
        <ButtonsContainer {...props} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should not render block when user status is not verified", async () => {
    props.user.status = userStatuses.AWAITING;
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <ButtonsContainer {...props} />
      </MemoryRouter>
    );

    expect(queryByText("BlockAccountButton")).not.toBeInTheDocument();
    expect(getByText("DeleteAccountButton")).toBeInTheDocument();
    expect(getByText("Wyślij wiadomość")).toBeInTheDocument();
  });

  it("should redirect to chat", () => {
    const { history, getByText } = renderWithRouter(
      <ButtonsContainer {...props} />
    );
    fireEvent.click(getByText("Wyślij wiadomość"));

    expect(history.location.pathname).toEqual("/chats/1");
  });
});

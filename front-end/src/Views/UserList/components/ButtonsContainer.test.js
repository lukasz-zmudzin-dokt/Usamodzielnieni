import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { userStatuses } from "constants/userStatuses";
import { userTypes } from "constants/userTypes";
import ButtonsContainer from "./ButtonsContainer";
import BlockAccountButton from "./BlockAccountButton";
import DeleteAccountButton from "./DeleteAccountButton";

jest.mock("./BlockAccountButton");
jest.mock("./DeleteAccountButton");

describe("BlockAccountButton", () => {
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
    BlockAccountButton.mockImplementation(({ disabled }) => (
      <button disabled={disabled}>BlockAccountButton</button>
    ));
    DeleteAccountButton.mockImplementation(({ disabled }) => (
      <button disabled={disabled}>DeleteAccountButton</button>
    ));
    apiShouldFail = false;
    props = {
      user: {
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

  it("should render disabled buttons when user status is blocked", async () => {
    props.user.status = userStatuses.BLOCKED;
    const { container } = render(
      <MemoryRouter>
        <ButtonsContainer {...props} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should not block and delete buttons when user type is staff", async () => {
    props.user.type = userTypes.STAFF;
    const { container } = render(
      <MemoryRouter>
        <ButtonsContainer {...props} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import ChatInfo from "./ChatInfo";
import { MemoryRouter } from "react-router-dom";

jest.mock("components", () => ({
  UserPicture: () => <div>UserPicture</div>,
}));

describe("ChatInfo", () => {
  it("should render without crashing", () => {
    const chat = {
      first: { first_name: "xd", last_name: "dx", username: "czesiek" },
      updated: "2020-05-25T21:48:18.965719+02:00",
    };

    const { container } = render(
      <MemoryRouter>
        <ChatInfo chat={chat} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});

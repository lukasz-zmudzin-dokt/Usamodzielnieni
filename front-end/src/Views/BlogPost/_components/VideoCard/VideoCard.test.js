import { staffTypes } from "constants/staffTypes";
import VideoCard from "./VideoCard";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { userTypes } from "constants/userTypes";

describe("VideoCard", () => {
  let content, user, cutCard;

  beforeEach(() => {
    cutCard = jest.fn();
    user = {
      type: userTypes.STAFF,
      data: {
        group_type: [staffTypes.BLOG_CREATOR],
      },
    };
    content = {
      id: "123",
      url: "qweqweqwe",
      description: "opis",
    };
  });

  it("should match snapshot", () => {
    const { container } = render(
      <VideoCard user={user} cutCard={cutCard} content={content} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should call deletion on click", () => {
    const { getByText } = render(
      <VideoCard user={user} cutCard={cutCard} content={content} />
    );

    fireEvent.click(getByText("X"));
    fireEvent.click(getByText("Usuń ✗"));

    expect(cutCard).toHaveBeenCalledWith(content.id);
  });
});

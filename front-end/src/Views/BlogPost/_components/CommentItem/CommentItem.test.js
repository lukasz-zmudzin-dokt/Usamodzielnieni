import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CommentItem from "./CommentItem";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";

describe("CommentItem", () => {
  let props;

  beforeEach(() => {
    props = {
      comment: {
        id: "123",
        author: {
          email: "mail@mail.pl",
          username: "qweqwe",
        },
        creationDate: new Date(2020, 10, 4),
        content: "Treść komentarza",
      },
      onDeleteClick: jest.fn(),
      user: {
        type: userTypes.STANDARD,
        data: {
          email: "mail@mail.pl",
          username: "qweqwe",
          group_type: undefined,
        },
      },
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<CommentItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render comment without buttons when standard user is not the author of the comment", () => {
    props.comment.author.email = "abc@123.com";

    const { queryByText } = render(<CommentItem {...props} />);

    expect(queryByText("Edytuj")).not.toBeInTheDocument();
    expect(queryByText("Usuń")).not.toBeInTheDocument();
  });

  it("should render comment with buttons when blog moderator is not the author of the comment", () => {
    props.comment.author.email = "abc@123.com";
    props.user.type = userTypes.STAFF;
    props.user.data.group_type = [staffTypes.BLOG_MODERATOR];

    const { getByText } = render(<CommentItem {...props} />);

    expect(getByText("Usuń")).toBeInTheDocument();
  });

  it("should call onDeleteClick when delete button is clicked", async () => {
    props.comment.author.email = "abc@123.com";
    props.user.type = userTypes.STAFF;
    props.user.data.group_type = [staffTypes.BLOG_MODERATOR];

    const { getByText } = render(<CommentItem {...props} />);
    fireEvent.click(getByText("Usuń"));
    fireEvent.click(getByText("Usuń ✗", { exact: false }));
    await expect(props.onDeleteClick).toHaveBeenCalledTimes(1);
  });

  it("should render placeholder when author is null", () => {
    props.comment.author = null;
    const { getByText } = render(<CommentItem {...props} />);
    expect(getByText("Użytkownik nieaktywny")).toBeInTheDocument();
  });
});

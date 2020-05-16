import React from "react";
import { render, wait, waitForElement } from "@testing-library/react";
import CommentsList from "./CommentsList";
import { CommentItem, CommentForm } from "../";
import {userTypes} from "constants/userTypes";

jest.mock("../");

describe("CommentsList", () => {
  let props, failFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    CommentItem.mockImplementation(() => <div>CommentItem</div>);
    CommentForm.mockImplementation(() => <div>CommentForm</div>);
    failFetch = false;
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "DELETE":
              resolve({
                status: 200,
              });
              break;
            default:
              resolve({});
              break;
          }
        }
      });
    });

    props = {
      blogId: "a1",
      comments: [{ id: "b1" }, { id: "b2" }, { id: "b3" }],
      setComments: jest.fn(),
      user: {
        type: userTypes.STANDARD,
        data: {
          email: "mail@mail.pl",
          group_type: undefined,
        },
      },
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<CommentsList {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render alert when comments list is empty", () => {
    props.comments = [];

    const { getByText } = render(<CommentsList {...props} />);

    expect(getByText("Brak komentarzy", { exact: false })).toBeInTheDocument();
  });

  it("should remove comment from list when onDeleteClick is called", async () => {
    CommentItem.mockImplementation(({ comment, onDeleteClick }) => {
      if (comment.id === "b2") {
        onDeleteClick("b2");
      }
      return <div>CommentItem</div>;
    });

    render(<CommentsList {...props} />);

    await wait(() => expect(props.setComments).toHaveBeenCalledTimes(1));
    expect(props.setComments).toHaveBeenNthCalledWith(1, [
      { id: "b1" },
      { id: "b3" },
    ]);
  });

  it("should render alert when api returns error status", async () => {
    failFetch = true;
    CommentItem.mockImplementation(({ comment, onDeleteClick }) => {
      if (comment.id === "b2") {
        onDeleteClick("b2");
      }
      return <div>CommentItem</div>;
    });

    const { getByText } = render(<CommentsList {...props} />);

    const errorMsg = "Wystąpił błąd podczas usuwania komentarza.";
    await waitForElement(() => getByText(errorMsg));
    expect(getByText(errorMsg)).toBeInTheDocument();
  });
});

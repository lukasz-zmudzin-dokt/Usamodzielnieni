import EditorForm from "./EditorForm";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createEditorState } from "medium-draft";

describe("EditorForm", () => {
  let onChange = jest.fn();
  let failFetch, token, props;
  beforeAll(() => {
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 201 });
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    failFetch = false;
    props = {
      customRef: null,
      state: createEditorState(),
      onChange: onChange,
      id: "abc123",
      token: token,
    };
  });

  it("should match snapshot", () => {
    const { container } = render(<EditorForm {...props} />);

    expect(container).toMatchSnapshot();
  });
});

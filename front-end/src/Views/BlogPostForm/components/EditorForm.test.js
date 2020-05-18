import EditorForm from "./EditorForm";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createEditorState } from "medium-draft";



describe("EditorForm", () => {
  let onChange = jest.fn();
  let failFetch, token, props, alerts;
  beforeAll(() => {
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          resolve({ status: 200 });
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    failFetch = false;
    props = {
      alerts: alerts,
      customRef: null,
      state: createEditorState(),
      onChange: onChange,
      id: "abc123",
      token: token,
    };
    alerts = {
      showAlert: jest.fn()
    };
  });

  it("should match snapshot", () => {
    const { container } = render(<EditorForm {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render alert on api fail', async () => {
    failFetch = true;
    render(
        <EditorForm {...props} />
    );

    fetch.call();
    await expect(alerts.showAlert).toHaveBeenCalledWith("Wystąpił błąd przy dodawaniu zdjęcia.");
  });
});

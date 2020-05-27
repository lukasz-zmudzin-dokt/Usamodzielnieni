import React from "react";
import {
  render,
  fireEvent,
  getByPlaceholderText,
  wait,
} from "@testing-library/react";
import ChatForm from "./ChatForm";

describe("chat form tests", () => {
  let props = {
    sendMessage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { container } = render(<ChatForm {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should call send message method and clear input value on enter click", async () => {
    const { getByPlaceholderText, getByAltText } = render(
      <ChatForm {...props} />
    );
    const button = getByAltText("send message");
    const input = getByPlaceholderText("Napisz wiadomość...");

    fireEvent.change(input, { target: { value: "test message" } });
    fireEvent.keyDown(input, {
      keyCode: 13,
      shiftKey: false,
    });

    expect(props.sendMessage).toHaveBeenCalledWith("test message");
    await wait(() => expect(input.value).toBe(""));
  });

  it("should not call send message method when input is empty", () => {
    const { getByPlaceholderText, getByAltText } = render(
      <ChatForm {...props} />
    );
    const button = getByAltText("send message");
    const input = getByPlaceholderText("Napisz wiadomość...");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(props.sendMessage).not.toHaveBeenCalled();
  });
});

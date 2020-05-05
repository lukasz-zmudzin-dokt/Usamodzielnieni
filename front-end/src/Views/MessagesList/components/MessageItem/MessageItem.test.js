import React from "react";
import { render } from "@testing-library/react";
import MessageItem from "./MessageItem";

describe("MessageItem", () => {
  it("should match snapshot(left)", () => {
    const { container } = render(
      <MessageItem content="abc" send="11:22 12.12.2020" side="left" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should match snapshot(right)", () => {
    const { container } = render(
      <MessageItem content="abc" send="11:22 12.12.2020" side="right" />
    );
    expect(container).toMatchSnapshot();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import PhotoButtonsContainer from "./PhotoButtonsContainer";
import { ChangePhotoButton, DeletePhotoButton } from "../";

jest.mock("../");

describe("PhotoButtonsContainer", () => {
  let props;

  beforeEach(() => {
    jest.clearAllMocks();
    ChangePhotoButton.mockImplementation(() => <div>ChangePhotoButton</div>);
    DeletePhotoButton.mockImplementation(() => <div>DeletePhotoButton</div>);
    props = {
      user: {},
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<PhotoButtonsContainer {...props} />);
    expect(container).toMatchSnapshot();
  });
});

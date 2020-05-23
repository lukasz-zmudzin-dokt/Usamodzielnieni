import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ChangePhotoButton from "./ChangePhotoButton";
import { ChangePhotoModal } from "../";

jest.mock("../");

describe("ChangePhotoButton", () => {
  let props;

  beforeEach(() => {
    jest.clearAllMocks();
    ChangePhotoModal.mockImplementation(
      ({ show }) => show && <div>ChangePhotoModal</div>
    );
    props = {
      user: {},
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<ChangePhotoButton {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should show modal when button is clicked", () => {
    const { getByText } = render(<ChangePhotoButton {...props} />);
    fireEvent.click(getByText("Zmień"));
    expect(getByText("ChangePhotoModal")).toBeInTheDocument();
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PhotoTab from "./PhotoTab";

describe("photo tab tests", () => {
  let props = {};
  let photo;
  beforeAll(() => {
    props = {
      data: null,
      onChange: jest.fn(),
      onPrevClick: () => {},
      comments: "",
    };
  });

  beforeEach(() => {
    photo = false;
    props = { ...props, hasPhoto: photo };
  });

  it("should render without crashing", () => {
    const { container } = render(<PhotoTab {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should react on input change", () => {
    const { getByText } = render(<PhotoTab {...props} />);
    const input = getByText("Wybierz zdjęcie");
    fireEvent.change(input, {
      target: { files: ["movie_4.png"] },
    });

    expect(input.files[0]).toBe("movie_4.png");
  });

  it("should render correct label on edited cv", () => {
    props = { ...props, hasPhoto: true };
    const { getByText } = render(<PhotoTab {...props} />);
    expect(getByText("Poprzednie zdjęcie")).toBeInTheDocument();
  });
});

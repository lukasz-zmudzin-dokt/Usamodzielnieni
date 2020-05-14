import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PhotoTab from "./PhotoTab";

describe("photo tab tests", () => {
  let props = {};
  //let data;
  beforeAll(() => {
    props = {
      data: {},
      onChange: (data) => {},
      onPrevClick: () => {},
      comments: "",
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<PhotoTab></PhotoTab>);
    expect(container).toMatchSnapshot();
  });
  it("should react on input change", () => {
    const { getByLabelText } = render(<PhotoTab {...props}></PhotoTab>);
    const input = getByLabelText("Wybierz zdjęcie:");
    fireEvent.change(input, {
      target: { files: ["movie_4.png"] },
    });
    expect(input.files[0]).toBe("movie_4.png");
  });
});

import React from "react";
import { render } from "@testing-library/react";
import Tile from "./Tile";
import { MemoryRouter } from "react-router-dom";

describe("Tile", () => {
  let props;

  beforeEach(() => {
    props = {
      title: "Tytuł kafelka",
      showImage: { left: true, top: true, right: true },
      imageUrl: "/foo_bar.jpg",
      color: "#fff",
      destination: "/blog/abc123",
    };
  });

  it("should render without crashing", () => {
    const { container } = render(
      <MemoryRouter>
        <Tile {...props} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render without crashing when showImage object is empty", () => {
    props.showImage = {};
    const { container } = render(
      <MemoryRouter>
        <Tile {...props} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});

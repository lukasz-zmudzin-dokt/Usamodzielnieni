import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PhotoTab from "./PhotoTab";
import { UserContext } from "context/UserContext";
import { userTypes } from "constants/userTypes";
import { VideoField } from "components";

jest.mock("components");

describe("photo tab tests", () => {
  let props = {};
  let photo;
  let user;
  let alertContext;
  beforeAll(() => {
    VideoField.mockImplementation(() => <div>VideoField</div>);
    props = {
      data: null,
      onChange: jest.fn(),
      onPrevClick: () => {},
      comments: "",
      alertContext: alertContext,
    };
  });

  beforeEach(() => {
    photo = false;
    props = { ...props, hasPhoto: photo };
    alertContext = {
      showAlert: jest.fn(),
    };
    user = {
      token: 123,
      type: userTypes.STANDARD,
      data: {},
    };
  });

  it("should render without crashing", () => {
    const { container } = render(
      <UserContext.Provider value={user}>
        <PhotoTab {...props} />
      </UserContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should react on input change", () => {
    const { getByText } = render(
      <UserContext.Provider value={user}>
        <PhotoTab {...props} />
      </UserContext.Provider>
    );
    const input = getByText("Wybierz zdjęcie");
    fireEvent.change(input, {
      target: { files: ["movie_4.png"] },
    });

    expect(input.files[0]).toBe("movie_4.png");
  });

  it("should render correct label on edited cv", () => {
    props = { ...props, hasPhoto: true };
    const { getByText } = render(
      <UserContext.Provider value={user}>
        <PhotoTab {...props} />
      </UserContext.Provider>
    );
    expect(getByText("Poprzednie zdjęcie")).toBeInTheDocument();
  });
});

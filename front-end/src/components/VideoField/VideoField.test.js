import React from "react";
import { render, wait } from "@testing-library/react";
import VideoField from "./VideoField";
import { UserContext } from "context";

describe("VideoField", () => {
  let failFetch;
  let apiVideo = {
    id: 1,
    url: "https://www.youtube.com/watch?v=q6EoRBvdVPQ",
  };
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "GET":
            resolve({
              status: 200,
              json: () => Promise.resolve(apiVideo),
            });
            break;
          default:
            reject({});
            break;
        }
      });
    });
  });

  beforeEach(() => {
    failFetch = false;
  });
  it("should render without crashing", async () => {
    const { container } = render(<VideoField id={1} />);

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(container).toMatchSnapshot();
  });

  it("should render error message", async () => {
    failFetch = true;
    const { getByText } = render(<VideoField id={1} />);

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(
      getByText("Wystąpił błąd podczas wczytywania filmu.")
    ).toBeInTheDocument();
  });

  it("should render button if staff is valid", async () => {
    const { getByText } = render(
      <UserContext.Provider
        value={{
          type: "staff",
          data: { group_type: ["staff_blog_moderator"] },
        }}
      >
        <VideoField id={1} />
      </UserContext.Provider>
    );

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(getByText("Zmień film")).toBeInTheDocument();
  });
});

import React from "react";
import { render, wait, waitForElement } from "@testing-library/react";
import VideoField from "./VideoField";
import { UserContext } from "context";

describe("VideoField", () => {
  let failFetch;
  let apiVideo = {
    id: 1,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: { id: 1, name: "xd" },
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

  it("should render err when videoErr", async () => {
    let apiVideo = {
      errVid: true,
    };
    const { getByText } = render(
      <UserContext.Provider
        value={{
          type: "staff",
          data: { group_type: ["staff_blog_moderator"] },
        }}
      >
        <VideoField {...apiVideo} />
      </UserContext.Provider>
    );

    await waitForElement(() =>
      getByText("Wystąpił błąd podczas wczytywania filmu.")
    );
  });

  it("should render render video and button for staff", async () => {
    let apiVideo = {
      videoItem: {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        id: 1,
        description: "haha",
        category: { id: 1, name: "xd" },
      },
    };
    const { getByText } = render(
      <UserContext.Provider
        value={{
          type: "staff",
          data: { group_type: ["staff_blog_moderator"] },
        }}
      >
        <VideoField {...apiVideo} />
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Zmień film"));
  });
});

import React from "react";
import BlogPost from "./BlogPost";
import {
  render,
  waitForElement,
  fireEvent,
  wait,
} from "@testing-library/react";
import { UserContext, AlertContext } from "context";
import { userTypes } from "constants/userTypes";
import { userStatuses } from "constants/userStatuses";
import { staffTypes } from "constants/staffTypes";

describe("BlogPost", () => {
  let post;
  let apiStatus;
  let user;
  let contextA = {
    showAlert: jest.fn(),
  };
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        switch (init.method) {
          case "GET":
            resolve(
              apiStatus !== 200
                ? { status: apiStatus }
                : {
                    status: 200,
                    json: () => Promise.resolve(post),
                  }
            );
            break;
          case "POST":
            resolve({
              status: 200,
              json: () => Promise.resolve({ id: "n1" }),
            });
            break;
          default:
            reject({});
            break;
        }
      });
    });
    user = {
      type: userTypes.STAFF,
      data: {
        username: "staffName",
        email: "qwe@qwe.fgh",
        group_type: [staffTypes.BLOG_CREATOR],
        status: userStatuses.VERIFIED,
      },
      token: "123",
    };
  });

  beforeEach(() => {
    apiStatus = 200;
    post = {
      id: 123,
      author: {
        username: "jankowalski123",
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan@kowalski.pl",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.",
      date_created: "2019-06-07",
      category: "qwe",
      tags: ["tag1", "tag2", "tag3"],
      comments: [
        {
          id: "1",
          author: {
            first_name: "Jan",
            last_name: "Nowak",
            email: "qwe@qwe.qwe",
            username: "jannowak",
          },
        },
      ],
    };
    jest.clearAllMocks();
  });

  it("should match snapshot after loaded", async () => {
    const { container, getByText } = render(
      <UserContext.Provider value={user}>
        <BlogPost />
      </UserContext.Provider>
    );
    await waitForElement(() =>
      getByText("Lorem ipsum dolor", { exact: false })
    );

    expect(container).toMatchSnapshot();
  });

  it("should render loading when loading lol", async () => {
    const { getByText, queryByText } = render(
      <UserContext.Provider value={user}>
        <BlogPost />
      </UserContext.Provider>
    );

    expect(getByText("Ładowanie", { exact: false })).toBeInTheDocument();
    expect(
      queryByText("Lorem ipsum dolor", { exact: false })
    ).not.toBeInTheDocument();
    await waitForElement(() =>
      getByText("Lorem ipsum dolor", { exact: false })
    );
  });

  it("should render error on api fail", async () => {
    apiStatus = 500;
    const { queryByText, getByText } = render(
      <UserContext.Provider value={user}>
        <BlogPost />
      </UserContext.Provider>
    );

    await waitForElement(() =>
      getByText("Wystąpił błąd podczas wczytywania zawartości bloga.")
    );

    expect(
      getByText("Wystąpił błąd podczas wczytywania zawartości bloga.")
    ).toBeInTheDocument();

    expect(
      queryByText("Lorem ipsum dolor", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should render comments", async () => {
    const { getByText } = render(
      <UserContext.Provider value={user}>
        <BlogPost />
      </UserContext.Provider>
    );

    await waitForElement(() => fetch);
    expect(getByText("jannowak", { exact: false })).toBeInTheDocument();
  });

  it("should not render comment form", async () => {
    const { getByText, queryByText } = render(
      <UserContext.Provider value={{}}>
        <BlogPost />
      </UserContext.Provider>
    );

    await waitForElement(() =>
      getByText("Lorem ipsum dolor", { exact: false })
    );
    expect(queryByText("Dodaj komentarz")).not.toBeInTheDocument();
  });

  it("should render new comment after submit", async () => {
    const { getByText, getByPlaceholderText } = render(
      <UserContext.Provider value={user}>
        <AlertContext.Provider value={contextA}>
          <BlogPost />
        </AlertContext.Provider>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Dodaj komentarz"));
    expect(getByText("Dodaj komentarz")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText("Treść komentarza"), {
      target: { value: "komentarz testowy" },
    });
    fireEvent.click(getByText("Prześlij"));

    await waitForElement(() => getByText("staffName"));
    await wait(() => expect(contextA.showAlert).toHaveBeenCalled());
    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Pomyślnie przesłano komentarz.",
      "success"
    );
    expect(getByText("komentarz testowy")).toBeInTheDocument();
  });
});

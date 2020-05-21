import BlogPostForm from "./BlogpostForm";
import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserContext } from "context/UserContext";
import { staffTypes } from "constants/staffTypes";
import { userTypes } from "constants/userTypes";
import proxy from "config/api";
import EditorForm from "./components/EditorForm";

const renderWithRouter = (
  ui,
  {
    route = "/blog/newPost",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = {
    type: userTypes.STAFF,
    data: { group_type: [staffTypes.BLOG_CREATOR] },
  };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <Router history={history}>{ui}</Router>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("BlogpostForm", () => {
  let apiFail;
  let post = {
    post_id: 123,
    category: "Gotowanie",
    content: '<p className="md-block-unstyled"><br/></p>',
    date_created: "2020/02/20",
    tags: ["tag1", "tag2"],
    title: "asdasd",
    author: {
      email: "staff4@staff4.staff4",
      username: "jankowalski",
    },
  };

  let user = {
    type: userTypes.STAFF,
    data: {
      group_type: [staffTypes.BLOG_CREATOR],
      first_name: "Jan",
      last_name: "Kowalski",
      email: "jan@kowal.ski",
      username: "jankowalski",
    },
    token: "123",
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "POST":
              resolve({
                status: 201,
                json: () => Promise.resolve({ id: "123" }),
              });
              break;
            case "PUT":
              resolve({
                status: 200,
                json: () => Promise.resolve({ id: "123" }),
              });
              break;
            case "GET":
              resolve({
                status: 200,
                json: () => Promise.resolve(post),
              });
              break;
            default:
              reject({});
              break;
          }
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    apiFail = false;
  });

  it("should match snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <BlogPostForm />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should put empty blog with right params", async () => {
    const { getByText } = render(
      <UserContext.Provider value={user}>
        <MemoryRouter>
          <BlogPostForm />
        </MemoryRouter>
      </UserContext.Provider>
    );

    fireEvent.click(getByText("Opublikuj"));
    await waitForElement(() => fetch);
    await expect(fetch).toHaveBeenCalledWith(proxy.blog + "blogpost/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user.token,
      },
      body: JSON.stringify({
        category: "",
        tags: [],
        content: '<p class="md-block-unstyled"><br/></p>',
      }),
    });
  });

  it("should render alert on api fail", async () => {
    apiFail = true;
    const { getByText } = render(
      <MemoryRouter>
        <BlogPostForm />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Wystąpił błąd", { exact: false }));
    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
  });

  it("should load post on edit", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <BlogPostForm />
      </MemoryRouter>
    );
  });

  it("should redirect to post url", async () => {
    const { history, getByText } = renderWithRouter(
      <MemoryRouter>
        <BlogPostForm />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Opublikuj"));
    await waitForElement(() => fetch("", { method: "POST" }));
    await expect(history.location.pathname).toBe(
      "/blog/blogpost/" + post.post_id,
      { exact: false }
    );
  });
});

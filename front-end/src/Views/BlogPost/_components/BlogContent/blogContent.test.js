import React from "react";
import BlogContent from "./BlogContent";
import { fireEvent, render } from "@testing-library/react";
import { waitForElement } from "@testing-library/dom";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserContext } from "context/UserContext";
import { userTypes } from "constants/userTypes";
import { staffTypes } from "constants/staffTypes";

const renderWithRouter = (
  ui,
  {
    route = `/blog/blogPost/1`,
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = {
    token: "123",
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

describe("BlogContent", () => {
  let post;
  let apiFail;
  let admin;

  beforeAll(() => {
    post = {
      author: {
        firstName: "Jan",
        lastName: "Kowalski",
        email: "qwe@qwe.qwe",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.",
      tags: ["tag1", "tag2", "tag3"],
      creationDate: "2020-02-02qweqweqwe",
      comments: [
        {
          author: {
            firstName: "Artysta",
            lastName: "Malarz",
            email: "a@m.com",
          },
          creationDate: "2019-01-01",
          content: "Witam w nowy rok!",
          id: 1,
        },
      ],
    };

    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (!apiFail) {
          switch (init.method) {
            case "DELETE":
              resolve({ status: 200 });
              break;
            default:
              reject({});
              break;
          }
        } else {
          resolve({ status: 500 });
        }
      });
    });
  });

  beforeEach(() => {
    admin = {
      type: userTypes.STAFF,
      data: {
        email: "a@m.com",
        group_type: [staffTypes.BLOG_CREATOR],
      },
      token: "123",
    };
    apiFail = false;
  });

  it("should match snapshot", () => {
    const { container } = render(<BlogContent post={post} user={admin} />);

    expect(container).toMatchSnapshot();
  });

  it("should convert date type", () => {
    const secondPost = post;
    secondPost.creationDate = "2019-06-07";
    const { getByText } = render(
      <BlogContent post={secondPost} user={admin} />
    );

    expect(getByText("07.06.2019", { exact: false })).toBeInTheDocument();
  });

  it("should return error alert", () => {
    const { getByText } = render(<BlogContent />);

    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
  });

  it("should return empty tag list", () => {
    const thirdPost = post;
    thirdPost.tags = [];
    const { getByText, queryByText } = render(
      <BlogContent post={thirdPost} user={admin} />
    );

    expect(getByText("Brak tagów", { exact: false })).toBeInTheDocument();
    expect(queryByText("tag1")).not.toBeInTheDocument();
  });

  it("should render mgmt button for admin", () => {
    const { getByText } = render(<BlogContent post={post} user={admin} />);

    expect(getByText("Edytuj", { exact: false })).toBeInTheDocument();
    expect(getByText("Usuń", { exact: false })).toBeInTheDocument();
  });

  it("should not render mgmt buttons", () => {
    const standard = {
      type: userTypes.STANDARD,
      data: {
        email: "asd@asd.asd",
      },
      token: "123",
    };
    const { queryByText } = render(<BlogContent post={post} user={standard} />);

    expect(queryByText("Edytuj", { exact: false })).not.toBeInTheDocument();
    expect(queryByText("Usuń", { exact: false })).not.toBeInTheDocument();
  });

  it("should delete post", async () => {
    const { getByText } = render(<BlogContent post={post} user={admin} />);

    fireEvent.click(getByText("Usuń post"));
    fireEvent.click(getByText("Usuń ✗"));

    await waitForElement(() =>
      getByText("Ten post został usunięty", { exact: false })
    );
    expect(
      getByText("Ten post został usunięty", { exact: false })
    ).toBeInTheDocument();
  });

  it("should throw alert on api fail while post deletion", async () => {
    apiFail = true;

    const { getByText, queryByText } = render(
      <BlogContent post={post} user={admin} />
    );

    fireEvent.click(getByText("Usuń post"));
    fireEvent.click(getByText("Usuń ✗"));

    await waitForElement(() =>
      getByText("Wystąpił błąd podczas usuwania posta.", { exact: false })
    );
    expect(
      getByText("Wystąpił błąd podczas usuwania posta.", { exact: false })
    ).toBeInTheDocument();
    expect(
      queryByText("Ten post został usunięty", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should redirect on edit click", async () => {
    const { history, getByText } = renderWithRouter(
      <BlogContent post={post} user={admin} />
    );

    fireEvent.click(getByText("Edytuj", { exact: false }));

    expect(history.location.pathname).toEqual("/blog/newPost/" + post.id);
  });

  it("should render alternative title", () => {
    post.title = "";
    const { getByText } = render(<BlogContent post={post} user={admin} />);

    expect(getByText("Tytuł posta")).toBeInTheDocument();
  });
});

import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import BlogPage from "Views/BlogPage";
import { MemoryRouter } from "react-router-dom";
import { AlertContext } from "context";
import proxy from "config/api";

describe("BlogPage", () => {
  let contextA = {
    showAlert: jest.fn(),
  };
  let failFetch;
  let apiFilters = ["abcd"];
  let apiPosts = [
    {
      tags: ["tag"],
      summary: "summary",
      category: "abcd",
      header: "/media/example_img.jpg",
      id: 1,
      title: "tytuł",
    },
    {
      tags: ["tag", "abcd"],
      category: "abcd",
      summary: "summary2",
      header: null,
      id: 2,
      title: "tytuł2",
    },
  ];
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        }
        switch (init.method) {
          case "POST":
            resolve({ status: 200 });
            break;
          case "GET":
            if (input.includes(proxy.blog + "blogposts/")) {
              resolve({ status: 200, json: () => Promise.resolve(apiPosts) });
            } else {
              resolve({ status: 200, json: () => Promise.resolve(apiFilters) });
            }

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
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("tytuł"));
    expect(container).toMatchSnapshot();
  });

  it("should load posts", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("tytuł"));
    expect(getByText("tytuł")).toBeInTheDocument();
  });

  it("should load filters", async () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    await waitForElement(() => getAllByText("abcd"));

    expect(getAllByText("abcd").length).toBe(3);
  });

  it("should show message if apiFails", async () => {
    failFetch = true;
    const { getByText } = render(
      <AlertContext.Provider value={contextA}>
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      </AlertContext.Provider>
    );

    await waitForElement(() => getByText("Filtruj posty"));

    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Nie udało się załadować postów"
    );
  });

  describe("Filter", () => {
    it("should be called with appropriate url(2 filters)", async () => {
      const { getByText, getAllByText, getByLabelText } = render(
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      );

      await waitForElement(() => getAllByText("abcd"));

      fireEvent.change(getByLabelText("Kategoria"), {
        target: { value: "abcd" },
      });

      fireEvent.change(getByLabelText("Tag"), {
        target: { value: "abcd" },
      });

      fireEvent.click(getByText("Filtruj posty"));

      await waitForElement(() => getAllByText("abcd"));

      await expect(fetch).toHaveBeenCalledWith(
        `${proxy.blog}blogposts/?category=abcd&tag=abcd`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
    });

    it("should be called with appropriate url(1 filter - tag)", async () => {
      const { getByText, getAllByText, getByLabelText } = render(
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      );

      await waitForElement(() => getAllByText("abcd"));

      fireEvent.change(getByLabelText("Tag"), {
        target: { value: "abcd" },
      });

      fireEvent.click(getByText("Filtruj posty"));

      await waitForElement(() => getAllByText("abcd"));

      await expect(fetch).toHaveBeenCalledWith(
        `${proxy.blog}blogposts/?tag=abcd`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
    });

    it("should render post with no tags", async () => {
      apiPosts[0].tags = [];
      const { getByText, getAllByText } = render(
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      );

      await waitForElement(() => getAllByText("abcd"));
      expect(getByText("Brak tagów")).toBeInTheDocument();
    });

    it("should be called with appropriate url(1 filter - category)", async () => {
      const { getByText, getAllByText, getByLabelText } = render(
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      );

      await waitForElement(() => getAllByText("abcd"));

      fireEvent.change(getByLabelText("Kategoria"), {
        target: { value: "abcd" },
      });

      fireEvent.click(getByText("Filtruj posty"));

      await waitForElement(() => getAllByText("abcd"));

      await expect(fetch).toHaveBeenCalledWith(
        `${proxy.blog}blogposts/?category=abcd`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
    });
  });
});

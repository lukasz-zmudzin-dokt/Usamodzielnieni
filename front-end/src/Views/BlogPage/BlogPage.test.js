import React from "react";
import { render, waitForElement } from "@testing-library/react";
import BlogPage from "Views/BlogPage";
import { MemoryRouter } from "react-router-dom";

jest.mock("./functions/fetchData", () => ({
  getPosts: () => {
    const obj = [
      {
        category: ["abc"],
        tags: ["def"],
        content: "aaaaa",
        dateCreated: "2020-04-20",
        author: {
          email: "staff4@staff4.com",
          first_name: "staff4",
          last_name: "staff4"
        }
      },
      {
        category: ["ghi"],
        tags: ["abc"],
        content: "bbbbb",
        dateCreated: "2020-04-20",
        author: {
          email: "staff4@staff4.com",
          first_name: "staff4",
          last_name: "staff4"
        }
      }
    ];
    return obj;
  },
  getFilters: () => {
    const filters = ["abc", "def"];
    return filters;
  }
}));

describe("BlogPage", () => {
  it("should match snapshot", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("aaaaa", { exact: false }));
    expect(container).toMatchSnapshot();
  });

  it("should load posts", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    await waitForElement(() => getByText("aaaaa", { exact: false }));
    expect(getByText("aaaaa", { exact: false })).toBeInTheDocument();
  });

  //   describe("Filter", () => {
  //     let apiFilters = ["abcd", "abcde"];
  //     global.fetch = jest.fn().mockImplementation((input, init) => {
  //       return new Promise((resolve, reject) => {
  //         if (failFetch) {
  //           resolve({ status: 500 });
  //         } else {
  //           switch (init.method) {
  //             case "GET":
  //               resolve({
  //                 status: 200,
  //                 json: () => Promise.resolve(apiFilters)
  //               });
  //               break;
  //             default:
  //               reject({});
  //               break;
  //           }
  //         }
  //       });
  //     });
  //     it("should be called with appropriate url", () => {
  //       const { getByText, getByLabelText } = render(
  //         <MemoryRouter>
  //           <BlogPage />
  //         </MemoryRouter>
  //       );

  //       fireEvent.change(getByLabelText("Kategoria"), {
  //         target: { value: "abc" }
  //       });

  //       fireEvent.change(getByLabelText("Tag"), {
  //         target: { value: "def" }
  //       });

  //       fireEvent.click(getByText("Filtruj posty"));

  //       expect(fetch).toHaveBeenCalled();

  //       //   expect(fetch).toHaveBeenCalledWith(
  //       //     `http://usamo-back.herokuapp.com/blog/blogposts/?category=abc&tag=def`,
  //       //     {
  //       //       headers: {
  //       //         Authorization: "Token undefined",
  //       //         "Content-Type": "application/json"
  //       //       },
  //       //       method: "GET"
  //       //     }
  //       //   );
  //     });
  //   });
});

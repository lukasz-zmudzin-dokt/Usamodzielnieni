import { getPosts, getFilters } from "./fetchData";

describe("getPosts", () => {
  let failFetch;
  let token;
  let filters = { category: "abc", tag: undefined };
  let apiPosts = [
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
  beforeAll(() => {
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({
                status: 200,
                json: () => Promise.resolve(apiPosts)
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
    failFetch = null;
  });

  it("should resolve with correct data if only one filter is set", async () => {
    await getPosts(token, filters);
    expect(fetch).toHaveBeenCalledWith(
      "http://usamo-back.herokuapp.com/blog/blogposts/?category=abc",
      {
        headers: {
          Authorization: "Token 123",
          "Content-Type": "application/json"
        },
        method: "GET"
      }
    );
  });
});

describe("getFilters", () => {
  let failFetch;
  let token;
  let filters = ["abc", "def"];
  beforeAll(() => {
    token = "123";
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (failFetch) {
          resolve({ status: 500 });
        } else {
          switch (init.method) {
            case "GET":
              resolve({
                status: 200,
                json: () => Promise.resolve(filters)
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
    failFetch = null;
  });

  it("should resolve with correct data if only one filter is set", async () => {
    await getFilters(token);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});

import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Filter from "Views/BlogPage/components/Filter";

describe("Filter", () => {
  let failFetch = false;
  let apiFilters = ["abcd", "abcde"];
  let props;
  global.fetch = jest.fn().mockImplementation((input, init) => {
    return new Promise((resolve, reject) => {
      if (failFetch) {
        resolve({ status: 500 });
      } else {
        switch (init.method) {
          case "GET":
            resolve({
              status: 200,
              json: () => Promise.resolve(apiFilters),
            });
            break;
          default:
            reject({});
            break;
        }
      }
    });
  });

  beforeEach(() => {
    props = { token: "abcd", setFilter: jest.fn(), count: 2 };
  });
  it("should match snapshot", async () => {
    const { container, getByText } = render(<Filter {...props} />);

    await waitForElement(() => getByText("wyczyść filtry", { exact: false }));

    expect(container).toMatchSnapshot();
  });

  it("should show message if api failed", async () => {
    failFetch = true;
    const { container, getByText } = render(<Filter {...props} />);

    await waitForElement(() =>
      getByText("Wystąpił błąd podczas ładowania filtrów.", { exact: false })
    );

    expect(
      getByText("Wystąpił błąd podczas ładowania filtrów.", { exact: false })
    ).toBeInTheDocument();
  });
});

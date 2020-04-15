import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Filter from "Views/BlogPage/components/Filter";
import { DEFAULT_INPUT } from "constants/other";
import { UserContext } from "context";
import { MemoryRouter } from "react-router-dom";

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
    failFetch = false;
  });

  it("should match snapshot", async () => {
    const { container, getByText } = render(<Filter {...props} />);

    await waitForElement(() => getByText("wyczyść filtry", { exact: false }));

    expect(container).toMatchSnapshot();
  });

  it("should show message if api failed", async () => {
    failFetch = true;
    const { getByText } = render(<Filter {...props} />);

    await waitForElement(() =>
      getByText("Wystąpił błąd podczas ładowania filtrów.", { exact: false })
    );

    expect(
      getByText("Wystąpił błąd podczas ładowania filtrów.", { exact: false })
    ).toBeInTheDocument();
  });

  it("should clear filters if button is clicked", async () => {
    const FilterCon = render(<Filter {...props} />);

    await waitForElement(() =>
      FilterCon.getByText("wyczyść filtry", { exact: false })
    );

    fireEvent.change(FilterCon.getByLabelText("Kategoria"), {
      target: { value: "abcd" },
    });

    fireEvent.change(FilterCon.getByLabelText("Tag"), {
      target: { value: "abcde" },
    });

    let input = FilterCon.getByLabelText("Kategoria");
    let input2 = FilterCon.getByLabelText("Tag");

    expect(input.value).toBe("abcd");
    expect(input2.value).toBe("abcde");

    fireEvent.click(FilterCon.getByText("Wyczyść filtry"));

    input = FilterCon.getByLabelText("Kategoria");
    input2 = FilterCon.getByLabelText("Tag");

    expect(input.value).toBe(DEFAULT_INPUT);
    expect(input2.value).toBe(DEFAULT_INPUT);
  });

  it("should change text if number of posts >= 5", async () => {
    props = { token: "abcd", setFilter: jest.fn(), count: 6 };
    const { getByText } = render(<Filter {...props} />);

    await waitForElement(() =>
      getByText("Znaleziono 6 postów", { exact: false })
    );

    expect(
      getByText("Znaleziono 6 postów", { exact: false })
    ).toBeInTheDocument();
  });

  it("should change text if number of posts < 5", async () => {
    props = { token: "abcd", setFilter: jest.fn(), count: 3 };
    const { getByText } = render(<Filter {...props} />);

    await waitForElement(() =>
      getByText("Znaleziono 3 posty", { exact: false })
    );

    expect(
      getByText("Znaleziono 3 posty", { exact: false })
    ).toBeInTheDocument();
  });

  it("should show button if type account = Staff", async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ type: "Staff" }}>
        <MemoryRouter>
          <Filter {...props} />
        </MemoryRouter>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("Stwórz nowy post", { exact: false }));

    expect(getByText("Stwórz nowy post", { exact: false })).toBeInTheDocument();
  });

  it("should not show button if type account != Staff", async () => {
    const { queryByText, getByText } = render(
      <UserContext.Provider value={{ type: "Standard" }}>
        <MemoryRouter>
          <Filter {...props} />
        </MemoryRouter>
      </UserContext.Provider>
    );

    await waitForElement(() => getByText("wyczyść filtry", { exact: false }));

    expect(queryByText("Stwórz nowy post")).not.toBeInTheDocument();
  });
});

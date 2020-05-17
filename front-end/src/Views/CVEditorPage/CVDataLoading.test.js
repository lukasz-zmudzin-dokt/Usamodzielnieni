import React from "react";
import { render, wait } from "@testing-library/react";
import CVEditorPage from "./CVEditorPage";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserContext } from "context/UserContext";

const renderWithRouterMatch = (
  ui,
  {
    path = "/cvEditor/:id",
    route = "/cvEditor/123",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = {
    type: "Standard",
    token: "123",
  };
  return {
    ...render(
      <UserContext.Provider value={context}>
        <Router history={history}>
          <Route path={path}>{ui}</Route>
        </Router>
      </UserContext.Provider>
    ),
  };
};

describe("load cv data", () => {
  let apiFail, data, feedback;
  let props = {
    match: {
      params: {
        id: 123,
      },
    },
  };
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else if (input === "https://usamo-back.herokuapp.com/cv/data/123/") {
          resolve({ status: 200, json: () => Promise.resolve(data) });
        } else {
          resolve({ status: 200, json: () => Promise.resolve(feedback) });
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    apiFail = false;
    data = {
      has_photo: false,
      is_verified: false,
      was_reviewed: false,
      cv_id: 123,
      basic_info: {
        date_of_birth: "14-5-2020",
        email: "dsfsdf@gsddf.fd",
        first_name: "Jan",
        last_name: "dsfdsfs",
        phone_number: "+48123456789",
        picture: null,
      },
      schools: [
        {
          additional_info: "sadasdas",
          name: "asdasdsad",
          year_end: 2020,
          year_start: 2020,
        },
      ],
      experiences: [],
      skills: [{ description: "taniec" }, { description: "śpiew" }],
      languages: [
        {
          name: "angielski",
          level: "A2",
        },
        {
          name: "niemiecki",
          level: "biegły",
        },
      ],
    };
    feedback = {
      basic_info: "dane osobowe ok",
      schools: "dd",
      experiences: "pracy bra",
      skills: "duzo umiesz",
      languages: "poliglota",
      additional_info: "",
    };
  });

  it("should load correct data on personal tab", async () => {
    const { getByLabelText } = renderWithRouterMatch(
      <CVEditorPage {...props} />
    );
    await wait(() => expect(fetch).toHaveBeenCalled());
    await expect(getByLabelText("Imię:").value).toBe(
      data.basic_info.first_name
    );
    expect(getByLabelText("Nazwisko:").value).toBe(data.basic_info.last_name);
    expect(getByLabelText("Adres email:").value).toBe(data.basic_info.email);
    expect(getByLabelText("Numer telefonu:").value).toBe(
      data.basic_info.phone_number
    );
  });

  it("should load and display correct date", async () => {
    const { getByLabelText } = renderWithRouterMatch(
      <CVEditorPage {...props} />
    );

    await wait(() => expect(fetch).toHaveBeenCalled());

    const birthDate = getByLabelText("Data urodzenia:").value;
    console.log(birthDate);
    expect(birthDate).toEqual("14.05.2020");
    // expect(getByText("14.05.2020")).toBeInTheDocument();
  });

  it("should load data and feedback", async () => {
    data.was_reviewed = true;
    const { getByLabelText, getByText } = renderWithRouterMatch(
      <CVEditorPage {...props} />
    );

    await wait(() => expect(fetch).toHaveBeenCalledTimes(2));

    expect(getByLabelText("Imię:").value).toBe("Jan");
    expect(getByText("dane osobowe ok")).toBeInTheDocument();
  });

  it("should render data only", async () => {
    data.was_reviewed = false;
    const { getByLabelText } = renderWithRouterMatch(
      <CVEditorPage {...props} />
    );

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(getByLabelText("Imię:").value).toEqual("Jan");
  });

  it("should fail on loading data and display alert", async () => {
    apiFail = true;
    const { getByText } = renderWithRouterMatch(<CVEditorPage {...props} />);

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(getByText("Imię:").value).not.toBe("Jan");
    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
  });
});

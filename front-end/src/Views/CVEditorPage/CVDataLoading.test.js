import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import CVEditorPage from "./CVEditorPage";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserContext } from "context/UserContext";
import proxy from "config/api";
import { userTypes } from "constants/userTypes";
import { AlertContext } from "context/AlertContext";

const renderWithRouterMatch = (
  ui,
  {
    path = "/cvEditor/:id",
    route = "/cvEditor/123",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  let context = {
    type: userTypes.STANDARD,
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
  let dataFail, feedbackFail, data, feedback, contextA, templates, templatesFail;
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
        switch (init.method) {
          case "PUT":
            resolve({ status: 200 });
            break;
          case "GET":
            if (dataFail && input === `${proxy.cv}data/123/`) {
              resolve({ status: 500 });
            } else if ( !dataFail && input === proxy.cv + "data/123/" ) {
              resolve({ status: 200, json: () => Promise.resolve(data) });
            } else if (feedbackFail && input === `${proxy.cv}admin/feedback/`) {
              resolve({ status: 500 });
            } else if (!feedbackFail && input === `${proxy.cv}admin/feedback/`) {
              resolve({ status: 200, json: () => Promise.resolve(feedback) });
            } else if ( templatesFail && input === proxy.cv + "templates/" ) {
              resolve({status: 500});
            } else if (!templatesFail && input === proxy.cv + "templates/" ) {
              resolve({status: 200, json: () => Promise.resolve({templates: templates})})
            } else {
              reject({});
            }
            break;
          default:
            resolve({ status: 200 });
        }
      });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    dataFail = false;
    feedbackFail = false;
    templatesFail = false;
    data = {
      has_photo: false,
      is_verified: false,
      was_reviewed: false,
      cv_id: 123,
      template: "mistyrose",
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
    contextA = {
      showAlert: jest.fn(),
    };

    templates = [
        "qwe", "asd", "zxc"
    ];
  });

  it("should load correct data on personal tab", async () => {
    const { getByLabelText } = renderWithRouterMatch(
      <AlertContext.Provider value={contextA}>
        <CVEditorPage {...props} />
      </AlertContext.Provider>
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
      <AlertContext.Provider value={contextA}>
        <CVEditorPage {...props} />
      </AlertContext.Provider>
    );

    await wait(() => expect(fetch).toHaveBeenCalled());

    const birthDate = getByLabelText("Data urodzenia:").value;
    expect(birthDate).toEqual("14.05.2020");
    // expect(getByText("14.05.2020")).toBeInTheDocument();
  });

  it("should load data and feedback", async () => {
    data.was_reviewed = true;
    const { getByLabelText, getByText } = renderWithRouterMatch(
      <AlertContext.Provider value={contextA}>
        <CVEditorPage {...props} />
      </AlertContext.Provider>
    );

    await wait(() => expect(fetch).toHaveBeenCalledTimes(3));

    expect(getByLabelText("Imię:").value).toBe("Jan");
    expect(getByText("dane osobowe ok")).toBeInTheDocument();
  });

  it("should render data only", async () => {
    data.was_reviewed = false;
    const { getByLabelText } = renderWithRouterMatch(
      <AlertContext.Provider value={contextA}>
        <CVEditorPage {...props} />
      </AlertContext.Provider>
    );

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(getByLabelText("Imię:").value).toEqual("Jan");
  });

  it("should fail on loading data and display alert(data)", async () => {
    dataFail = true;
    const { getByText } = renderWithRouterMatch(
      <AlertContext.Provider value={contextA}>
        <CVEditorPage {...props} />
      </AlertContext.Provider>
    );

    await wait(() => expect(fetch).toHaveBeenCalled());

    expect(getByText("Imię:").value).not.toBe("Jan");
    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Nie udało się załadować CV."
    );
  });

  it("should fail on loading data and display alert(feedback)", async () => {
    feedbackFail = true;
    data.was_reviewed = true;
    renderWithRouterMatch(
      <AlertContext.Provider value={contextA}>
        <CVEditorPage {...props} />
      </AlertContext.Provider>
    );

    await wait(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(contextA.showAlert).toHaveBeenCalledWith(
      "Nie udało się załadować uwag."
    );
  });

  it("should send edited data", async () => {
    data.was_reviewed = false;
    const { getByLabelText, getByText } = renderWithRouterMatch(
      <AlertContext.Provider value={contextA}>
        <CVEditorPage {...props} />
      </AlertContext.Provider>
    );

    await wait(() => expect(fetch).toHaveBeenCalledTimes(3));

    fireEvent.change(getByLabelText("Imię:"), { target: { value: "janusz" } });
    fireEvent.click(getByText("Zapisz zmiany i generuj CV"));

    expect(fetch).toHaveBeenCalledWith(
      proxy.cv + "data/123/",
      {
        body:
          '{"template":"mistyrose","basic_info":{"first_name":"janusz","last_name":"dsfdsfs","date_of_birth":"14-5-2020","phone_number":"+48123456789","email":"dsfsdf@gsddf.fd"},"schools":[{"year_start":2019,"year_end":2019,"name":"asdasdsad","additional_info":"sadasdas"}],"experiences":[],"skills":[{"description":"taniec"},{"description":"śpiew"}],"languages":[{"name":"angielski","level":"A2"},{"name":"niemiecki","level":"biegły"}]}',
        headers: {
          Authorization: "Token 123",
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );
  });
});

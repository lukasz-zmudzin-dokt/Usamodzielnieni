import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  queries,
} from "@testing-library/react";
import CVEditorPage from "./CVEditorPage";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserContext } from "context/UserContext";

const renderWithRouter = (
  ui,
  {
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
        <Router history={history}>{ui}</Router>
      </UserContext.Provider>
    ),
    history,
  };
};

describe("load cv data", () => {
  let apiFail, data, feedback, token;
  let props = {
    match: {
      params: {
        id: 123,
      },
    },
  };
  beforeAll(() => {
    token = 123;
    global.fetch = jest.fn().mockImplementation((input, init) => {
      return new Promise((resolve, reject) => {
        if (apiFail) {
          resolve({ status: 500 });
        } else if (data.was_reviewed) {
          resolve({
            status: 200,
            json: () => {
              Promise.resolve(data);
              Promise.resolve(feedback);
            },
          });
        } else {
          resolve({ status: 200, json: () => Promise.resolve(data) });
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
        first_name: "Jan",
        last_name: "Kowalski",
        date_of_birth: "01.01.2000",
        phone_number: "+48123456789",
        email: "qwe@qwe.qwe",
      },
      schools: [
        {
          name: "szkoła1",
          description: "klasa1",
          startTime: "2016",
          endTime: "2019",
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
    const { getByLabelText } = await renderWithRouter(
      <CVEditorPage {...props} />
    );
    await waitForElement(() => fetch);
    await expect(getByLabelText("Imię:").value).toBe(
      data.basic_info.first_name
    );
    expect(getByLabelText("Nazwisko:").value).toBe(data.basic_info.last_name);
    expect(getByLabelText("Email:").value).toBe(data.basic_info.email);
    expect(getByLabelText("Numer telefonu:").value).toBe(
      data.basic_info.phone_number
    );
  });

  it("should load and display correct date", async () => {
    const { getByLabelText, getByText } = await renderWithRouter(
      <CVEditorPage />
    );

    const birthDate = getByLabelText("Data urodzenia:").value;
    expect(birthDate).toEqual(new Date(2000, 0, 0));
    expect(getByText("01.01.2020")).toBeInTheDocument();
  });

  it("should load data and feedback", async () => {
    data.was_reviewed = true;
    const { getByLabelText, getByText } = renderWithRouter(
      <CVEditorPage {...props} />
    );

    expect(getByLabelText("Imię:").value).toBe("Jan");
    expect(getByText("dane osobowe ok")).toBeInTheDocument();
  });

  it("should render data only", () => {
    data.was_reviewed = false;
    const { getByText, getByLabelText } = renderWithRouter(<CVEditorPage />);
    expect(getByLabelText("Imię:").value).toEqual("Jan");
    expect(getByText("dane osobowe ok")).not.toBeInTheDocument();
  });

  it("should fail on loading data and display alert", async () => {
    apiFail = true;
    const { getByText } = renderWithRouter(<CVEditorPage />);

    expect(getByText("Imię:").value).not.toBe("Jan");
    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
  });

  it("should change photo placeholder", async () => {
    data.has_photo = true;
    const { getByText } = renderWithRouter(<CVEditorPage />);

    await waitForElement(() => fetch);
    await expect(getByText("Poprzednie zdjęcie")).toBeInTheDocument();
  });

  it("should not change photo placeholder", async () => {
    data.has_photo = false;
    const { getByText } = renderWithRouter(<CVEditorPage />);

    await waitForElement(() => fetch);
    await expect(getByText("Wybierz zdjęcie")).toBeInTheDocument();
  });
});

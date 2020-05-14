import React from "react";
import { render, fireEvent, queries } from "@testing-library/react";
import CVEditorPage from "./CVEditorPage";
import { sendData, getFeedback } from "./functions/other.js";

let mock_submitData = {};

jest.mock("./components", () => ({
  PersonalDataTab: (props) => {
    if (mock_submitData.PersonalDataTab) {
      props.onChange(mock_submitData.PersonalDataTab);
      mock_submitData.PersonalDataTab = undefined;
    }
    return (
      <div>
        <span>PersonalDataTabMock</span>
        <button type="button" onClick={props.onNextClick}>
          Dalej
        </button>
      </div>
    );
  },
  EducationTab: (props) => {
    if (mock_submitData.EducationTab) {
      props.onChange(mock_submitData.EducationTab);
      mock_submitData.EducationTab = undefined;
    }
    return (
      <div>
        <span>EducationTabMock</span>
        <button type="button" onClick={props.onPrevClick}>
          Wstecz
        </button>
      </div>
    );
  },
  WorkExperienceTab: (props) => {
    if (mock_submitData.WorkExperienceTab) {
      props.onChange(mock_submitData.WorkExperienceTab);
      mock_submitData.WorkExperienceTab = undefined;
    }
    return <div>WorkExperienceTabMock</div>;
  },
  LanguagesTab: (props) => {
    if (mock_submitData.LanguagesTab) {
      props.onChange(mock_submitData.LanguagesTab);
      mock_submitData.LanguagesTab = undefined;
    }
    return <div>LanguagesTabMock</div>;
  },
  SkillsTab: (props) => {
    if (mock_submitData.SkillsTab) {
      props.onChange(mock_submitData.SkillsTab);
      mock_submitData.SkillsTab = undefined;
    }
    return <div>SkillsTabMock</div>;
  },
  PhotoTab: (props) => {
    if (mock_submitData.PhotoTab) {
      props.onChange(mock_submitData.PhotoTab);
      mock_submitData.PhotoTab = undefined;
    }
    return (
      <div>
        <span>PhotoTabMock</span>
        <button type="submit">Prześlij</button>
      </div>
    );
  },
}));

jest.mock("./functions/other.js");

describe("CVEditorPage", () => {
  let apiComments = {
    personalata: "abc",
    education: "def",
    workExperience: "ghi",
    skills: "jkl",
    languages: "mno",
    photo: "xd",
  };
  let apiShouldFail;
  beforeEach(() => {
    apiShouldFail = false;
    jest.clearAllMocks();
    mock_submitData = {};
    sendData.mockImplementation(() => jest.fn());
    getFeedback.mockImplementation(() => {
      if (apiShouldFail) {
        throw 500;
      } else {
        return new Promise((resolve, reject) => {
          resolve({ apiComments });
        });
      }
    });
  });

  it("should render without crashing", () => {
    const { container } = render(<CVEditorPage />);
    expect(container).toMatchSnapshot();
  });
  it("should render without crashing when api fails", () => {
    apiShouldFail = true;
    const { container } = render(<CVEditorPage />);
    expect(container).toMatchSnapshot();
  });

  it("should change tab when the active card calls onNextClick and onPrevClick function", () => {
    let activeTab;
    const { getByRole } = render(<CVEditorPage />);

    activeTab = getByRole("tabpanel");
    const nextButton = queries.getByText(activeTab, "Dalej");

    fireEvent.click(nextButton);

    activeTab = getByRole("tabpanel");
    expect(activeTab).toMatchSnapshot();
    const prevButton = queries.getByText(activeTab, "Wstecz");
    fireEvent.click(prevButton);

    activeTab = getByRole("tabpanel");
    expect(activeTab).toMatchSnapshot();
  });

  it("should change tab when tab button is clicked", () => {
    const { getByRole } = render(<CVEditorPage />);

    fireEvent.click(queries.getByText(getByRole("tablist"), "Edukacja"));
    const activeTab = getByRole("tabpanel");

    expect(activeTab).toMatchSnapshot();
  });
});

describe("CVEditorPage  - submit", () => {
  let shouldThrowError;
  beforeEach(() => {
    jest.clearAllMocks();
    shouldThrowError = false;
    mock_submitData = {
      PersonalDataTab: {
        firstName: "Jan",
        lastName: "Kowalski",
        birthDate: new Date(2000, 10, 4),
        phoneNumber: "+48123123123",
        email: "jan.kowalski@mail.com",
      },
      EducationTab: [
        {
          startTime: new Date(2002, 4, 4),
          endTime: new Date(2003, 5, 6),
          place: "Warszawa",
          description: "Jakiś opis",
        },
      ],
      WorkExperienceTab: [
        {
          startTime: new Date(2002, 4, 4),
          endTime: new Date(2003, 5, 6),
          place: "Warszawa",
          description: "Jakiś opis",
        },
      ],
      LanguagesTab: [{ name: "angielski", level: "podstawowy" }],
      SkillsTab: [{ name: "Jakaś umiejętność" }],
      PhotoTab: {},
    };
    sendData.mockImplementation(() => {
      if (shouldThrowError) {
        throw new Error();
      }
      return jest.fn();
    });
  });

  it("should submit form when submit button is clicked", async () => {
    const { getByRole } = render(<CVEditorPage />);

    fireEvent.click(queries.getByText(getByRole("tablist"), "Zdjęcie"));
    const activeTab = getByRole("tabpanel");
    const submitButton = queries.getByText(activeTab, "Prześlij");
    fireEvent.click(submitButton);

    expect(sendData).toHaveBeenCalledTimes(1);
    expect(sendData.mock.calls[0]).toMatchSnapshot();
  });

  it("should render error alert after submit returns error", async () => {
    shouldThrowError = true;
    const { getByRole, getByText } = render(<CVEditorPage />);

    fireEvent.click(queries.getByText(getByRole("tablist"), "Zdjęcie"));
    const activeTab = getByRole("tabpanel");
    const submitButton = queries.getByText(activeTab, "Prześlij");
    fireEvent.click(submitButton);

    expect(getByText("Wystąpił błąd", { exact: false })).toBeInTheDocument();
  });
});

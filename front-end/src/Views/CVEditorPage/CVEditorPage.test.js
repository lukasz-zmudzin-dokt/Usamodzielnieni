import React from 'react';
import { render, fireEvent, queries } from '@testing-library/react';
import CVEditorPage from './CVEditorPage';
import { sendData, getFeedback } from "./functions/other.js";
import {MemoryRouter} from "react-router-dom";

let mock_submitData = {};

jest.mock('./components', () => ({
    PersonalDataTab: (props) => {
        if (mock_submitData.PersonalDataTab) {
            props.onChange(mock_submitData.PersonalDataTab)
            mock_submitData.PersonalDataTab = undefined;
        }
        return (
            <div>
                <span>PersonalDataTabMock</span>
                <button type="button" onClick={props.onNextClick}>Dalej</button>
            </div>
        )
    },
    EducationTab: (props) => {
        if (mock_submitData.EducationTab) {
            props.onChange(mock_submitData.EducationTab)
            mock_submitData.EducationTab = undefined;
        }
        return (
            <div>
                <span>EducationTabMock</span>
                <button type="button" onClick={props.onPrevClick}>Wstecz</button>
            </div>
        )
    },
    WorkExperienceTab: (props) => {
        if (mock_submitData.WorkExperienceTab) {
            props.onChange(mock_submitData.WorkExperienceTab)
            mock_submitData.WorkExperienceTab = undefined;
        }
        return <div>WorkExperienceTabMock</div>
    },
    LanguagesTab: (props) => {
        if (mock_submitData.LanguagesTab) {
            props.onChange(mock_submitData.LanguagesTab)
            mock_submitData.LanguagesTab = undefined;
        }
        return <div>LanguagesTabMock</div>
    },
    SkillsTab: (props) => {
        if (mock_submitData.SkillsTab) {
            props.onChange(mock_submitData.SkillsTab)
            mock_submitData.SkillsTab = undefined;
        }
        return <div>SkillsTabMock</div>
    },
    PhotoTab: (props) => {
        if (mock_submitData.PhotoTab) {
            props.onChange(mock_submitData.PhotoTab)
            mock_submitData.PhotoTab = undefined;
        }
        return (
            <div>
                <span>PhotoTabMock</span>
                <button type="submit" onClick={() => props.onSubmit(mock_submitData)}>Prześlij</button>
            </div>
        )
    },
}));

jest.mock('./functions/other.js');

describe('CVEditorPage', () => {
    let apiComments = {
        personalata: "abc",
        education: "def",
        workExperience: "ghi",
        skills: "jkl",
        languages: "mno",
        photo: "xd"
    };
    let apiShouldFail;
    beforeEach(() => {
        apiShouldFail = false;
        jest.clearAllMocks();
        mock_submitData = {};
        sendData.mockImplementation(() => jest.fn());
        getFeedback.mockImplementation(() => {
            if(apiShouldFail) {
                throw 500;
            } else {
                return new Promise((resolve, reject) => {
                    resolve({ apiComments });
                });
            }
        });
    });

    it('should render without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <CVEditorPage />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });
    it('should render without crashing when api fails', () => {
        apiShouldFail = true;
        const { container } = render(
            <MemoryRouter>
                <CVEditorPage />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    })

    it('should change tab when the active card calls onNextClick and onPrevClick function', () => {
        let activeTab
        const { getByRole } = render(
            <MemoryRouter>
                <CVEditorPage />
            </MemoryRouter>
        );

        activeTab = getByRole('tabpanel');
        const nextButton = queries.getByText(activeTab, 'Dalej');

        fireEvent.click(nextButton);

        activeTab = getByRole('tabpanel');
        expect(activeTab).toMatchSnapshot();
        const prevButton = queries.getByText(activeTab, 'Wstecz');
        fireEvent.click(prevButton);

        activeTab = getByRole('tabpanel');
        expect(activeTab).toMatchSnapshot();
    })

    it('should change tab when tab button is clicked', () => {
        const { getByRole } = render(
            <MemoryRouter>
                <CVEditorPage />
            </MemoryRouter>
        );

        fireEvent.click(queries.getByText(getByRole('tablist'), 'Edukacja'));
        const activeTab = getByRole('tabpanel');

        expect(activeTab).toMatchSnapshot();
    })
});
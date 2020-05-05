import React from 'react';
import { render, fireEvent, queries } from '@testing-library/react';
import CVEditorPage from './CVEditorPage';
import { sendData, getFeedback } from "./functions/other.js";
import {MemoryRouter} from "react-router-dom";

let mock_submitData = {};

jest.mock('./functions/other.js');

describe("CVEditor", () => {
    let sendData = jest.fn();
    jest.mock('./components', () => ({
        PersonalDataTab: (props) => {
            if (mock_submitData.PersonalDataTab) {
                props.onChange(mock_submitData.PersonalDataTab)
                mock_submitData.PersonalDataTab = undefined;
            }
            return (
                <div>
                    <span>PersonalDataTabMock</span>
                    <button type="button" onClick={() => props.onNextClick}>Dalej</button>
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
                    <button type="button" onClick={() => props.onPrevClick}>Wstecz</button>
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
                props.onSubmit(mock_submitData.PhotoTab)
                mock_submitData.PhotoTab = undefined;
            }
            return (
                <div>
                    <span>PhotoTabMock</span>
                    <button type="submit" onClick={() => props.onSubmit}>Generuj CV</button>
                </div>
            )
        },
    }));

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if (apiShouldFail) {
                    resolve({status: 500});
                } else {
                    switch(init.methos) {
                        case "POST":
                            resolve({status: 201});
                            break;
                        case "PUT":
                            resolve({status: 200});
                            break;
                        case "GET":
                            resolve({status: 200, json: () => Promise.resolve("/cv/media/blank")});
                            break;
                        default:
                            reject({});
                            break;
                    }
                }
            })
        });
    });

    describe('CVEditorPage', () => {
        let apiComments = {
            personalData: "abc",
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
            const nextButton = queries.queryByText(activeTab, 'Dalej');
            if (nextButton !== null) {
                fireEvent.click(nextButton);

                activeTab = getByRole('tabpanel');
                expect(activeTab).toMatchSnapshot();
            }
            const prevButton = queries.queryByText(activeTab, 'Wstecz');
            if (prevButton !== null) {
                fireEvent.click(prevButton);

                activeTab = getByRole('tabpanel');
                expect(activeTab).toMatchSnapshot();
            }
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

    describe('CVEditorPage  - submit', () => {
        let shouldThrowError;
        beforeEach(() => {
            jest.clearAllMocks();
            shouldThrowError = false;
            mock_submitData = {
                PersonalDataTab: {
                    firstName: 'Jan',
                    lastName: 'Kowalski',
                    birthDate: new Date(2000, 10, 4),
                    phoneNumber: '+48123123123',
                    email: 'jan.kowalski@mail.com'
                },
                EducationTab: [
                    {
                        startTime: new Date(2002, 4, 4),
                        endTime: new Date(2003, 5, 6),
                        place: 'Warszawa',
                        description: 'Jakiś opis'
                    }
                ],
                WorkExperienceTab: [
                    {
                        startTime: new Date(2002, 4, 4),
                        endTime: new Date(2003, 5, 6),
                        place: 'Warszawa',
                        description: 'Jakiś opis'
                    }
                ],
                LanguagesTab: [
                    { name: 'angielski', level: 'podstawowy' }
                ],
                SkillsTab: [
                    { name: 'Jakaś umiejętność' }
                ],
                PhotoTab: {
                    onSubmit: jest.fn()
                }
            };
            sendData.mockImplementation(() => {
                if (shouldThrowError) {
                    throw new Error();
                }
                return jest.fn()
            });
        });

        it('should submit form when submit button is clicked', async () => {
            const { getByRole } = render(
                <MemoryRouter>
                    <CVEditorPage />
                </MemoryRouter>
            );

            fireEvent.click(queries.getByText(getByRole('tablist'), 'Zdjęcie'));
            const activeTab = getByRole('tabpanel');
            const submitButton = queries.getByText(activeTab, 'Generuj CV');
            fireEvent.click(submitButton);

            expect(sendData).toHaveBeenCalled();
            expect(sendData.mock.calls[0]).toMatchSnapshot();
        })

        it('should render error alert after submit returns error', async () => {
            shouldThrowError = true;
            const { getByRole, getByText } = render(
                <MemoryRouter>
                    <CVEditorPage />
                </MemoryRouter>
            );

            fireEvent.click(queries.getByText(getByRole('tablist'), 'Zdjęcie'));
            const activeTab = getByRole('tabpanel');
            const submitButton = queries.getByText(activeTab, 'Generuj CV');
            fireEvent.click(submitButton);
            await expect(getByText('Wystąpił błąd', { exact: false })).toBeInTheDocument();
        })
    });
});

// describe('cvEditor data loading', () => {
//     beforeAll(() => {
//         let getCVData = jest.fn().mockImplementation((input, init) => {
//             return new Promise((resolve, reject) => {
//
//             })
//         })
//     });
// });


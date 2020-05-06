import React from "react";
import {render, waitForElement, fireEvent} from '@testing-library/react';
import CVEditorPage from "./CVEditorPage";
import {Router} from "react-router-dom";
import {createMemoryHistory} from 'history';
import {UserContext} from "context/UserContext";
import {getCVdata} from "./functions/other";

const renderWithRouter = (
    ui,
    {
        route = "/cvEditor/123",
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) => {
    let context = {
        type: "Standard",
        token: "123"
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


describe('load cv data', () => {
    let apiFail, data, feedback;
    beforeAll(() => {
        const getCVData = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                if (apiFail) {
                    throw 500;
                } else {
                    resolve({status: 200, json: () => Promise.resolve(data)})
                }
            })
        });
        const getFeedback = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                if (apiFail) {
                    throw 500;
                } else {
                    resolve({status: 200, json: () => Promise.resolve(feedback)})
                }
            })
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
                date_of_birth: "01-01-2000",
                phone_number: '+48123456789',
                email: "qwe@qwe.qwe"
            },
            schools: [
                {
                    name: 'szkoła1',
                    description: 'klasa1',
                    startTime: '2016',
                    endTime: '2019'
                }
            ],
            experiences: [],
            skills: [
                {description: 'taniec'},
                {description: 'śpiew'}
            ],
            languages: [
                {
                    name: 'angielski',
                    level: 'A2'
                },
                {
                    name: 'niemiecki',
                    level: 'biegły'
                }
            ]
        };
        feedback = {
            "basic_info": "dane osobowe ok",
            "schools": "ddd",
            "experiences": "pracy bra",
            "skills": "duzo umiesz",
            "languages": "poliglota",
            "additional_info": ""
        }
    });

    it('should load correct data on personal tab', async () => {
        const {getByLabelText, getByText} = await renderWithRouter(
            <CVEditorPage />
        );

        expect(getByText("Jan")).toBeInTheDocument();
        expect(getByLabelText("Imię:").value).toBe(data.basic_info.first_name);
        expect(getByLabelText("Nazwisko:").value).toBe(data.basic_info.last_name);
        expect(getByLabelText("Email:").value).toBe(data.basic_info.email);
        expect(getByLabelText("Numer telefonu:").value).toBe(data.basic_info.phone_number);
    });

    it('should load and display correct date', async () => {
        const {getByLabelText, getByText} = await renderWithRouter(
            <CVEditorPage />
        );
    });

    it('should load data and feedback', async () => {

    });

    it('should fail on loading data and display alert', async () => {

    });
});
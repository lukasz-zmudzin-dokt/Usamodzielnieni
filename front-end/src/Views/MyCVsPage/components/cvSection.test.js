import CVSection from "./cvSection";
import React from "react";
import {fireEvent, render, waitForElement} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";

describe('CVSection', () => {
    let failFetch;
    let myCV;
    let user;
    let handleShowing = jest.fn();
    let token = 123;

    beforeAll(() => {
        global.open = jest.fn();
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise(((resolve, reject) => {
                if (failFetch) {
                    resolve({ status: 500 });
                }
                switch (init.method) {
                    case "GET":
                        resolve({ status: 200, json: () => Promise.resolve("/media/cv/0") });
                        break;
                    default:
                        reject({});
                        break;
                }
            }));
        });

        user = {
            type: 'Standard',
            token: '123'
        };
    });

    beforeEach(() => {
        myCV = {
            cv_id: 0,
            basic_info: {
                first_name: "Jarek",
                last_name: "Arek",
                email: "jamjestjarek@arek.pp"
            }
        };
        failFetch = false;
        jest.clearAllMocks();
    });

    it('should match snapshot', () => {
        const {container} = render(
            <MemoryRouter>
                <CVSection cv={myCV} handleShowing={handleShowing} token={token} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it('should render cv status approved', () => {
        myCV = {...myCV, is_verified: true};
        const {getByText} = render(
            <MemoryRouter>
                <CVSection cv={myCV} handleShowing={handleShowing} token={token}  />
            </MemoryRouter>
        );

        expect(getByText('Zatwierdzone')).toBeInTheDocument();
    });

    it('should render cv status needs fixing', () => {
        myCV = {...myCV, was_reviewed: true};
        const {getByText} = render(
            <MemoryRouter>
                <CVSection cv={myCV} handleShowing={handleShowing} token={token}  />
            </MemoryRouter>
        );

        expect(getByText('Wymaga poprawek')).toBeInTheDocument();
    });

    it('should call fetch with right params', async () => {
        const {getByText} = render(
            <MemoryRouter>
                <CVSection cv={myCV} handleShowing={handleShowing} token={token}  />
            </MemoryRouter>
        );

        fireEvent.click(getByText('Zobacz CV'));
        await expect(fetch).toHaveBeenCalledWith("https://usamo-back.herokuapp.com/cv/generator/0/", {
            method: "GET",
            headers: {
                "Authorization": "token " + token,
                "Content-Type": "application/json"
            }
        });
    });

    it('should open cv url', async () => {
       const {getByText} = render(
           <MemoryRouter>
               <CVSection cv={myCV} handleShowing={handleShowing} token={token}  />
           </MemoryRouter>
       );

       fireEvent.click(getByText('Zobacz CV'));
       await waitForElement(() => fetch("https://usamo-back.herokuapp.com/cv/generator/" + myCV.cv_id + "/", {
           method: "GET"
       }));
       expect(open).toHaveBeenCalledWith("https://usamo-back.herokuapp.com/media/cv/0", "_blank");
    });
});
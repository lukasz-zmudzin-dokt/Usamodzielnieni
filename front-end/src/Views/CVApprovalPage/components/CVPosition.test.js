import React from "react";
import {fireEvent, render, waitForElement} from "@testing-library/react";
import {MemoryRouter, Redirect} from "react-router-dom";
import CVPosition from "./CVPosition";

describe("CVPosition", () => {
    let failFetch;
    let apiCV = {
        cv_id: 0,
        basic_info: {
            first_name: "Jarek",
            last_name: "Arek",
            email: "jamjestjarek@arek.pp"
        }
    };

    beforeAll(() => {
        global.open = jest.fn();
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise(((resolve, reject) => {
                if (failFetch) {
                    resolve({ status: 500 });
                }
                switch (init.method) {
                    case "POST":
                        resolve({ status: 200 });
                        break;
                    case "GET":
                        resolve({ status: 200, json: () => Promise.resolve(CVUrl) });
                        break;
                    default:
                        reject({});
                        break;
                }
            }));
        });
    });

    it("should match snapshot", async () => {
        const { container, getByText } = render (
            <MemoryRouter>
                <CVPosition cv={apiCV} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Jarek"));
        expect(container).toMatchSnapshot();
    });

    it("should call showCV when asked to", async () => {

        const { getByText } = render (
            <MemoryRouter>
                <CVPosition cv={apiCV} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Jarek"));
        fireEvent.click(getByText("Pokaż CV"));

        await expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/cv/generator/0/",
            {
                headers: {
                    Authorization: "token undefined",
                    "Content-Type": "application/json",
                },
                method: "GET"
            }
        );
    });

    it("should call acceptCV when asked to", async () => {

        const { getByText } = render (
            <MemoryRouter>
                <CVPosition cv={apiCV} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Jarek"));
        fireEvent.click(getByText("Akceptuj"));

        await expect(fetch).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/cv/admin/verification/0/",
            {
                headers: {
                    Authorization: "token undefined",
                    "Content-Type": "application/json",
                },
                method: "POST"
            }
        );

    });

});
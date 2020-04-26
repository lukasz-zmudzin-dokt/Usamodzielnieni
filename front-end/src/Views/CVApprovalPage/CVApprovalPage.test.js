import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import CVApprovalPage from "./CVApprovalPage";
import { MemoryRouter } from "react-router-dom";

describe("CVApproval", () => {
    let failFetch;
    let apiCVs;

    beforeAll(() => {
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
                        resolve({ status: 200, json: () => Promise.resolve(apiCVs) });
                        break;
                    default:
                        reject({});
                        break;
                }
            }));
        });
    });

    beforeEach(() => {
        apiCVs = [
            {
                cv_id: 0,
                basic_info: {
                    first_name: "Jarek",
                    last_name: "Arek",
                    email: "jamjestjarek@arek.pp"
                }
            },
            {
                cv_id: 1,
                basic_info: {
                    first_name: "Ala",
                    last_name: "Mala",
                    email: "malaala@lala.la"
                }
            }
        ];
        failFetch = false;
        jest.clearAllMocks();
    });

    it("should match snapshot", async () => {
        const { container, getByText } = render (
            <MemoryRouter>
                <CVApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Jarek"));
        expect(container).toMatchSnapshot();
    });

    it("should load cvs", async () => {
        const { getByText } = render (
            <MemoryRouter>
                <CVApprovalPage />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Jarek"));
        expect(getByText("Jarek")).toBeInTheDocument();
    });

    it("should view alert at api fail", async () => {
        failFetch = true;
        const { getByText } = render (
            <MemoryRouter>
                <CVApprovalPage />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Ups, wystąpił błąd."));
        expect(getByText("Ups, wystąpił błąd.")).toBeInTheDocument();
    });

    it("should view alert at api returning no cvs", async () => {
        apiCVs = [];
        const { getByText } = render (
            <MemoryRouter>
                <CVApprovalPage />
            </MemoryRouter>
        );

        await waitForElement(() => getByText("Brak CV do akceptacji."));
        expect(getByText("Brak CV do akceptacji.")).toBeInTheDocument();
    })
});

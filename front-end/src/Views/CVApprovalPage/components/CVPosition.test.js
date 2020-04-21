import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CVPosition from "./CVPosition";

describe("CVPosition", () => {
    test("should match with snapshot", () => {
        const testCV = {
            cv_id: 0,
            basic_info: {
                first_name: "Jan",
                last_name: "Kowalski",
                email: "ab@cd.pl"
            }
        };
        const { container } = render(
            <MemoryRouter>
                <CVPosition cv={testCV} />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });
});
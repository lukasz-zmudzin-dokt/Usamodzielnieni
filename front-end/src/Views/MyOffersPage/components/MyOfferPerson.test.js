import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import MyOfferPerson from "./MyOfferPerson";
import { MemoryRouter } from "react-router-dom";

describe("MyOffersPerson", () => {
    let testPerson = {
        cv_url: "/media/blank_test_cv",
        date_posted: "2020-04-06T01:34:27.899000+02:00",
        email: "standard1@standard1.com",
        first_name: "standard1",
        job_offer: "47991e86-4b42-4507-b154-1548bf8a3bd3",
        last_name: "standard1",
        user_id: "b582b042-d6d8-4e57-9447-564a6748b4f7"
    };

    beforeAll(() => {
        global.open = jest.fn();
    });

    it("should match snapshot", async () => {
        const { container, getByText } = render (
            <MemoryRouter>
                <MyOfferPerson person={testPerson} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("standard1 standard1"));
        //console.log(getByText);
        expect(container).toMatchSnapshot();
    });

    it("should display a person", async () => {
        const { getByText } = render (
            <MemoryRouter>
                <MyOfferPerson person={testPerson} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Pokaż CV"));
        expect(getByText("standard1 standard1")).toBeInTheDocument();
    });

    it("should want to open new tab", async () => {
        const { getByText } = render (
            <MemoryRouter>
                <MyOfferPerson person={testPerson} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Pokaż CV"));
        fireEvent.click(getByText("Pokaż CV"));
        expect(open).toHaveBeenCalledTimes(1);
    });

    it("should open new tab with proper cv url", async () => {
        const { getByText } = render (
            <MemoryRouter>
                <MyOfferPerson person={testPerson} />
            </MemoryRouter>
        );
        await waitForElement(() => getByText("Pokaż CV"));
        fireEvent.click(getByText("Pokaż CV"));
        expect(open).toHaveBeenCalledWith("http://usamo-back.herokuapp.com/media/blank_test_cv", "_blank");
    });
});
import {MemoryRouter} from "react-router-dom";
import React from "react";
import Filters from "./Filters";
import {render, fireEvent, waitForElement} from '@testing-library/react';

describe("Filters", () => {
    let setFilter = jest.fn();

    it('should render correctly', () => {
        const {container} = render(
            <MemoryRouter>
                <Filters
                    disabled={false}
                    count={10}
                    setFilter={setFilter}
                    statusList={jest.fn()}
                    typeList={jest.fn()}
                />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it('should clear filters on click', () => {
        const {getByLabelText, getByText} = render(
            <MemoryRouter>
                <Filters
                    disabled={false}
                    count={10}
                    setFilter={setFilter}
                    statusList={jest.fn()}
                    typeList={jest.fn()}
                />
            </MemoryRouter>
        );
        fireEvent.change(getByLabelText("Nazwa użytkownika", {exact: false}), {
            target: {value: "standard"}
        });
        fireEvent.change(getByLabelText("Email", {exact: false}), {
            target: {value: "qwe@qwe.qwe"}
        });
        fireEvent.change(getByLabelText("Status:", {exact: false}), {
            target: {value: "Verified"}
        });

        fireEvent.click(getByText("Wyczyść filtry"));

        expect(getByLabelText("Nazwa użytkownika").value).toBe("");
        expect(getByLabelText("Email").value).toBe("");
        expect(getByLabelText("Status:").value).toBe("-- Wybierz --");
    });

    it("should not render offers count when offers count is 0", () => {
        const { queryByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <Filters
                    setFilter={setFilter}
                    count={0}
                    disabled={false}
                    typeList={jest.fn()}
                    statusList={jest.fn()}
                />
            </MemoryRouter>
        );

        expect(queryByText("Liczba znalezionych", { exact: false })).not.toBeInTheDocument();
    });

    it('should call setFilter with right params', () => {
        const { getByLabelText, getByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <Filters
                    setFilter={setFilter}
                    count={10}
                    disabled={false}
                    typeList={jest.fn()}
                    statusList={jest.fn()}
                />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText("Nazwa użytkownika", {exact: false}), {
            target: {value: "standard"}
        });
        fireEvent.change(getByLabelText("Email", {exact: false}), {
            target: {value: "qwe@qwe.qwe"}
        });
        fireEvent.change(getByLabelText("Status:", {exact: false}), {
            target: {value: "Verified"}
        });

        fireEvent.click(getByText("Filtruj użytkowników"));

        expect(setFilter).toHaveBeenCalledWith({
            username: "standard",
            email: "qwe@qwe.qwe",
            type: undefined,
            status: "Verified"
        })
    });
});
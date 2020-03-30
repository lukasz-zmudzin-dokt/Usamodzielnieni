import {fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import HomeDataForm from "./homeDataForm";
import {getByTestId, getByText, waitForElement} from "@testing-library/dom";
import React from "react";


describe('HomeDataForm', () => {
    it('should render correctly', () => {
        const data = null;
        const onBlur = jest.fn();
        const { component } = render(
            <MemoryRouter>
                <HomeDataForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('should return missing fields error', async () => {
        const data = parent.state.homeData;
        const onBlur = jest.fn();
        const {component, getByPlaceholderText} = render(
            <MemoryRouter>
                <HomeDataForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText("Nazwa placówki"), {
            target: {value: "qwe"}
        });
        fireEvent.change(getByPlaceholderText("Ulica"), {
            target: {value: "qwe"}
        });
        fireEvent.change(getByPlaceholderText("Nazwa miasta"), {
            target: {value: "qwe"}
        });
        fireEvent.change(getByPlaceholderText("Kod pocztowy"), {
            target: {value: "00-001"}
        });

        fireEvent.click(getByTestId(parent, "submitBtn"));
        await waitForElement(() => getByText(component, "Podaj "));
        expect(getByText("Podaj ", {exact: false})).toBeInTheDocument();
    });
});
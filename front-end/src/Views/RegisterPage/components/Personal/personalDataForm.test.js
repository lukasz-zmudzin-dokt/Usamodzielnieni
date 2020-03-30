import {fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import PersonalDataForm from "./personalDataForm";
import {getByTestId, getByText, waitForElement} from "@testing-library/dom";
import React from "react";


describe('PersonalDataForm', () => {
    it('should render correctly', () => {
        const data = {
            personalData: null
        };
        const onBlur = jest.fn();
        const { component } = render(
            <MemoryRouter>
                <PersonalDataForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('should return missing fields error', async () => {
        const data = parent.state.personalData;
        const onBlur = jest.fn();
        const {component, getByPlaceholderText} = render(
            <MemoryRouter>
                <PersonalDataForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText(component, "Imię"), {
            target: {value: "qwe"}
        });
        fireEvent.change(getByPlaceholderText(component, "Nazwisko"), {
            target: {value: "qweqwe"}
        });
        fireEvent.change(getByPlaceholderText(component, "Numer telefonu"), {
            target: {value: "+48123456789"}
        });

        fireEvent.click(getByTestId(parent, "submitBtn"));
        await waitForElement(() => getByText(component, "Podaj "));
        expect(getByText(component,"Podaj ")).toBeInTheDocument();
    });
});
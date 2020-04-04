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
        const { container } = render(
            <MemoryRouter>
                <PersonalDataForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    it('should return missing fields error', async () => {
        const data = parent.state.personalData;
        const onBlur = jest.fn();
        const {container, getByPlaceholderText} = render(
            <MemoryRouter>
                <PersonalDataForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText(container, "Imię"), {
            target: {value: "qwe"}
        });
        fireEvent.change(getByPlaceholderText(container, "Nazwisko"), {
            target: {value: "qweqwe"}
        });
        fireEvent.change(getByPlaceholderText(container, "Numer telefonu"), {
            target: {value: "+48123456789"}
        });

        fireEvent.click(getByTestId(parent, "submitBtn"));
        await waitForElement(() => getByText(container, "Podaj "));
        expect(getByText(container,"Podaj ")).toBeInTheDocument();
    });
});
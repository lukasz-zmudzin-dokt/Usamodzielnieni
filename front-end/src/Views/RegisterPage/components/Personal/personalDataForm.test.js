import {fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import PersonalDataForm from "./personalDataForm";
import {getByTestId, getByText, waitForElement} from "@testing-library/dom";
import React from "react";


describe('PersonalDataForm', () => {
    let props;

    beforeAll(() => {
        props = {
            data: "",
            onBlur: jest.fn()
        }
    });

    it('should render correctly', () => {
        const data = {
            personalData: null
        };
        const onBlur = jest.fn();
        const { container } = render(
            <MemoryRouter>
                <PersonalDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });
    
    it('should call onBlur with first name value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <PersonalDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Imię");
        fireEvent.change(input, {target: {value: "Jan"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {first_name: "Jan"});
    });

    it('should call onBlur with last name value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <PersonalDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Nazwisko");
        fireEvent.change(input, {target: {value: "Kowalski"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {last_name: "Kowalski"});
    });

    it('should call onBlur with phone number value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <PersonalDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Numer telefonu");
        fireEvent.change(input, {target: {value: "+48123456789"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {phone_number: "+48123456789"});
    });
});
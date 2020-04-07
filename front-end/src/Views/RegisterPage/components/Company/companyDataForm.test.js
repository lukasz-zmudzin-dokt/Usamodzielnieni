import {fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import CompanyDataForm from "./companyDataForm";
import {getByTestId, getByText, waitForElement} from "@testing-library/dom";
import React from "react";


describe('CompanyDataForm', () => {
    let props;

    beforeAll(() => {
        props = {
            data: "",
            onBlur: jest.fn()
        }
    });

    it('should render correctly', () => {
        const { container } = render(
            <MemoryRouter>
                <CompanyDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    it('should call onBlur with name of company value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <CompanyDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Nazwa firmy");
        fireEvent.change(input, {target: {value: "Politechnika Warszawska"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {name_of_place: "Politechnika Warszawska"});
    });

    it('should call onBlur with street value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <CompanyDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Ulica");
        fireEvent.change(input, {target: {value: "Poznańska"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {street: "Poznańska"});
    });

    it('should call onBlur with city value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <CompanyDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Nazwa miasta");
        fireEvent.change(input, {target: {value: "Warszawa"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {city: "Warszawa"});
    });

    it('should call onBlur with post code value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <CompanyDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Kod pocztowy");
        fireEvent.change(input, {target: {value: "01-234"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {city_code: "01-234"});
    });

    it('should call onBlur with NIP value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <CompanyDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("NIP");
        fireEvent.change(input, {target: {value: "0123456789"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {company_nip: "0123456789"});
    });

});
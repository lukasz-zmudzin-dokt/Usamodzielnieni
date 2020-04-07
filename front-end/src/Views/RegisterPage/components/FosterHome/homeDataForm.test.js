import {MemoryRouter} from "react-router-dom";
import HomeDataForm from "./homeDataForm";
import {getByTestId, getByText, waitForElement, fireEvent, render} from "@testing-library/react";
import React from "react";


describe('HomeDataForm', () => {
    let props;

    beforeAll(() => {
        props = {
            data: "",
            onBlur: jest.fn()
        }
    });

    it('should render correctly', () => {
        const  {container}  = render(
            <MemoryRouter>
                <HomeDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });
    it('should call onBlur with name of home value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <HomeDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Nazwa placówki");
        fireEvent.change(input, {target: {value: "Dom dziecka"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {name_of_place: "Dom dziecka"});
    });

    it('should call onBlur with street value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <HomeDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Ulica");
        fireEvent.change(input, {target: {value: "Poznańska"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {street: "Poznańska"});
    });

    it('should call onBlur with city value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <HomeDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Nazwa miasta");
        fireEvent.change(input, {target: {value: "Warszawa"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {city: "Warszawa"});
    });

    it('should call onBlur with post code value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <HomeDataForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Kod pocztowy");
        fireEvent.change(input, {target: {value: "01-234"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {city_code: "01-234"});
    });
});
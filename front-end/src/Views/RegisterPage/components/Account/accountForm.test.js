import {fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import AccountForm from "./accountForm";
import {waitForElement} from "@testing-library/dom";
import React from "react";


describe('AccountForm', () => {
    let props;
    beforeEach(() => {
        props = {
            data: "",
            onBlur: jest.fn()
        };
    });

    it('should render correctly', () => {
        const { container } = render(
            <MemoryRouter>
                <AccountForm {...props} />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    it('should call onBlur with email value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <AccountForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Email");
        fireEvent.change(input, {target: {value: "example@onet.pl"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {email: "example@onet.pl"});
    });

    it('should call onBlur with username value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <AccountForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Nazwa użytkownika");
        fireEvent.change(input, {target: {value: "standard1"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {username: "standard1"});
    });

    it('should call onBlur with password value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <AccountForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Hasło");
        fireEvent.change(input, {target: {value: "standard1"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {password: "standard1"});
    });

    it('should call onBlur with passwordR value', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <AccountForm data={props.data} onBlur={props.onBlur} />
            </MemoryRouter>
        );
        const input = getByPlaceholderText("Powtórz hasło");
        fireEvent.change(input, {target: {value: "standard1"}});
        expect(props.onBlur).toHaveBeenCalledWith(...props.data, {passwordR: "standard1"});
    });
});
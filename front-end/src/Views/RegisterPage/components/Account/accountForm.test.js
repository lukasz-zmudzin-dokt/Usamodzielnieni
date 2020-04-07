import {fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import AccountForm from "./accountForm";
import {waitForElement} from "@testing-library/dom";
import React from "react";


describe('AccountForm', () => {
    let props;
    beforeEach(() => {
        props = {
            data: {},
            onBlur: () => {}
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

    it('should return missing fields error', async () => {
        const data = parent.state.accountData;
        const onBlur = jest.fn();
        const {component, getByPlaceholderText, getByText, getByTestId} = render(
            <MemoryRouter>
                <AccountForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText("Email"), {
            target: {value: "qwe@qwe.qwe"}
        });
        fireEvent.change(getByPlaceholderText("Nazwa użytkownika"), {
            target: {value: "qwe"}
        });
        fireEvent.change(getByPlaceholderText("Hasło"), {
            target: {value: "qweqwe"}
        });
        fireEvent.change(getByPlaceholderText("Powtórz hasło"), {
            target: {value: "qweqwe"}
        });

        fireEvent.click(getByTestId(parent, "submitBtn"));
        await waitForElement(() => getByText(component, "Podaj"));
        expect(getByText("Podaj ", {exact: false})).toBeInTheDocument();
    });
});
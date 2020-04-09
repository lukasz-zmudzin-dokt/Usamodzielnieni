import {fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import CompanyDataForm from "./companyDataForm";
import {getByTestId, getByText, waitForElement} from "@testing-library/dom";
import React from "react";


describe('CompanyDataForm', () => {
    it(' should render correctly', () => {
        const data = null;
        const onBlur = jest.fn();
        const { container } = render(
            <MemoryRouter>
                <CompanyDataForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    it('should return missing fields error', async () => {
        const data = parent.state.companyData;
        const onBlur = jest.fn();
        const {container, getByPlaceholderText} = render(
            <MemoryRouter>
                <CompanyDataForm data={data} onBlur={onBlur} />
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText("Nazwa firmy"), {
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
        fireEvent.change(getByPlaceholderText("NIP"), {
            target: {value: "123"}
        });

        fireEvent.click(getByTestId(parent, "submitBtn"));
        await waitForElement(() => getByText(container, "Podaj "));
        expect(getByText("Podaj ", {exact: false})).toBeInTheDocument();
    });
});
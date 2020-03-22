import React from "react";
import AccountForm from "./accountForm";
import CompanyDataForm from "./companyDataForm";
import HomeDataForm from "./homeDataForm";
import PersonalDataForm from "./personalDataForm";
import {MemoryRouter} from "react-router-dom";
import {render, fireEvent} from "@testing-library/react";
import {getByPlaceholderText, getByTestId, getByText, waitForElement} from "@testing-library/dom";
import {RegisterPage} from "../../index";

describe('DataForm', () => {
    let token = '123';
    let apiFail;
    const {parent} = render(
        <MemoryRouter>
            <RegisterPage />
        </MemoryRouter>
    );

    beforeEach(() => {
        apiFail = false;
        jest.clearAllMocks();
    });

    describe('AccountForm', () => {
        it('should render correctly', () => {
            const data = null;
            const onBlur = jest.fn();
            const { component } = render(
                <MemoryRouter>
                    <AccountForm data={data} onBlur={onBlur} />
                </MemoryRouter>
            );
            expect(component).toMatchSnapshot();
        });

        it('should return missing fields error', async () => {
            const token = '123';
            const {component, getByPlaceholderText, getByText, getByTestId} = render(
                <MemoryRouter>
                    <AccountForm token={token} />
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

    describe('CompanyDataForm', () => {
        it(' should render correctly', () => {
            const data = null;
            const onBlur = jest.fn();
            const { component } = render(
                <MemoryRouter>
                    <CompanyDataForm data={data} onBlur={onBlur} />
                </MemoryRouter>
            );
            expect(component).toMatchSnapshot();
        });

        it('should return missing fields error', async () => {
            const token = '123';
            const {component, getByPlaceholderText} = render(
                <MemoryRouter>
                    <CompanyDataForm token={token} />
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
            await waitForElement(() => getByText(component, "Podaj "));
            expect(getByText("Podaj ", {exact: false})).toBeInTheDocument();
        });
    });

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
            const token = '123';
            const {component, getByPlaceholderText} = render(
                <MemoryRouter>
                    <HomeDataForm token={token} />
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

    describe('PersonalDataForm', () => {
        it('should render correctly', () => {
            const data = null;
            const onBlur = jest.fn();
            const { component } = render(
                <MemoryRouter>
                    <PersonalDataForm data={data} onBlur={onBlur} />
                </MemoryRouter>
            );
            expect(component).toMatchSnapshot();
        });

        it('should return missing fields error', async () => {
            const token = '123';
            const {component, getByPlaceholderText} = render(
                <MemoryRouter>
                    <PersonalDataForm token={token} />
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
});

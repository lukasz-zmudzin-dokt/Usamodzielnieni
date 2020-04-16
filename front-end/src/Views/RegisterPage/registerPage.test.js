import React from "react";
import {render} from "@testing-library/react";
import RegisterPage from "./index.js"

import {MemoryRouter} from 'react-router-dom';
import { UserProvider } from "context";
import {waitForElement, fireEvent} from "@testing-library/dom";

describe('RegisterPage', () => {
    describe( "RegisterPageTest", () => {
        it("should render without crashing", () => {
            render(
                <UserProvider >
                    <MemoryRouter>
                        <RegisterPage />
                    </MemoryRouter>
                </UserProvider>);
        });

        it("onClick should be called", async () => {
            const onClick = jest.fn();
            const { component, getByText } = render(
                <MemoryRouter>
                    <RegisterPage onSubmit={onClick} />
                </MemoryRouter>
            );
            component.setState({
                userName: '123'
            });
            fireEvent.click(getByText('Wyślij'));

            await expect(onClick).toHaveBeenCalledWith('123');
        });

        it("should match snapshot", () => {
            const { container } = render(
                <UserProvider>
                    <MemoryRouter>
                        <RegisterPage />
                    </MemoryRouter>
                </UserProvider>
            );
            expect(container).toMatchSnapshot();
        });

        it('should change account type', () => {
            const {getByTestId, getByDisplayValue} = render(
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            );

            fireEvent.change(getByTestId("typeSelector", {exact: false}), {
                target: {value: "Pracodawcą"}
            });
            expect(getByDisplayValue("Pracodawcą")).toBeInTheDocument();
        });

        //it('should ')git
    });

    describe("api connection test", () => {
        let apiFailure;
        let token;
        let apiRegistration;

        beforeAll(() => {
            token = "123";
            global.fetch = jest.fn().mockImplementation((input, init) => {
                return new Promise((resolve, reject) => {
                    if (apiFailure) {
                        resolve({status: 500});
                    } else if (init.method === "POST") {
                        resolve({
                            status: 200,
                            json: () => Promise.resolve(apiRegistration)
                        });
                    } else {
                        reject({});
                    }
                })
            })
        });

        beforeEach(() => {
            apiFailure = false;
            jest.clearAllMocks();
        });

        it('should get response from api', async () => {
            apiFailure = false;
            const { getByText } = render(
                <MemoryRouter>
                    <RegisterPage token={token} />
                </MemoryRouter>
            );

            fireEvent.click(getByTestId('submitBtn', {exact: false}));
            await waitForElement(() => getByText('Podaj nazwisko'));
            expect(getByText('Podaj nazwisko')).toBeInTheDocument();
        });
    });
});

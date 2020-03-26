import React from "react";
import { render } from "@testing-library/react";
import AddCvForm from "./AddCvForm";
import { MemoryRouter } from 'react-router-dom';

describe('AddCvForm', () => {
    it('should render without crashing', () => {
        const id = "123";
        const user = { token: "abc123" };

        const { container } = render(
            <MemoryRouter>
                <AddCvForm id={id} user={user} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});
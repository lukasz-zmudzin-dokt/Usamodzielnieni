import React from "react";
import { render } from "@testing-library/react";
import JobOffersPage from "./JobOffersPage";
import { MemoryRouter } from 'react-router-dom';

describe('JobOffersPage', () => {
    it('should render without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <JobOffersPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});
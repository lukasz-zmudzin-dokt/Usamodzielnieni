import React from "react";
import { render } from "@testing-library/react";
import JobOfferInfo from "./JobOfferInfo";
import { MemoryRouter } from 'react-router-dom';

describe('JobOfferInfo', () => {
    it('should render without crashing', () => {
        const offer = {
            id: "123",
            title: "Tytuł oferty",
            companyName: "Nazwa firmy",
            voivodeship: "mazowieckie",
            expirationDate: "2020-12-24"
        };

        const { container } = render(
            <MemoryRouter>
                <JobOfferInfo offer={offer} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});
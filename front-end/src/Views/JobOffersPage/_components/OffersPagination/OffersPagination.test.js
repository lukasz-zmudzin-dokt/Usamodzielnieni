import React from "react";
import { render } from "@testing-library/react";
import OffersPagination from "./OffersPagination";
import { MemoryRouter } from 'react-router-dom';

describe('OffersPagination', () => {
    it('should render without crashing', () => {
        const current = 20;
        const max = 100;

        const { container } = render(
            <MemoryRouter>
                <OffersPagination current={current} max={max} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it('should render disabled arrows and one item when only one page is available', () => {
        const current = 1;
        const max = 1;

        const { getByText, queryByText } = render(
            <MemoryRouter>
                <OffersPagination current={current} max={max} />
            </MemoryRouter>
        );
        
        [
            getByText('First'),
            getByText('Previous'),
            getByText('Next'),
            getByText('Last'),
            getByText('1')
        ].forEach(btn => {
            expect(btn).toBeInTheDocument();
            expect(btn.closest('a')).not.toBeInTheDocument();
        });

        expect(queryByText('0')).not.toBeInTheDocument();
        expect(queryByText('2')).not.toBeInTheDocument();
    });

    it('should render arrows and 3 items when current page is 1 and many pages are available', () => {
        const current = 1;
        const max = 100;

        const { getByText, queryByText } = render(
            <MemoryRouter>
                <OffersPagination current={current} max={max} />
            </MemoryRouter>
        );
        
        [
            getByText('First'),
            getByText('Previous'),
            getByText('1')
        ].forEach(btn => {
            expect(btn).toBeInTheDocument();
            expect(btn.closest('a')).not.toBeInTheDocument();
        });

        [
            getByText('2'),
            getByText('3'),
            getByText('Next'),
            getByText('Last')
        ].forEach(btn => {
            expect(btn).toBeInTheDocument();
            expect(btn.closest('a')).toBeInTheDocument();
        })

        expect(queryByText('0')).not.toBeInTheDocument();
        expect(queryByText('4')).not.toBeInTheDocument();
    });
    
    it('should render arrows and 3 items when current page is last and many pages are available', () => {
        const current = 100;
        const max = 100;

        const { getByText, queryByText } = render(
            <MemoryRouter>
                <OffersPagination current={current} max={max} />
            </MemoryRouter>
        );
        
        [
            getByText('100'),
            getByText('Next'),
            getByText('Last')
        ].forEach(btn => {
            expect(btn).toBeInTheDocument();
            expect(btn.closest('a')).not.toBeInTheDocument();
        });

        [
            getByText('First'),
            getByText('Previous'),
            getByText('98'),
            getByText('99')
        ].forEach(btn => {
            expect(btn).toBeInTheDocument();
            expect(btn.closest('a')).toBeInTheDocument();
        })

        expect(queryByText('97')).not.toBeInTheDocument();
        expect(queryByText('101')).not.toBeInTheDocument();
    });
});
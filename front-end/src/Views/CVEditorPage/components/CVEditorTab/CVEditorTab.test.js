import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CVEditorTab from "./CVEditorTab";

describe('CVEditorTab', () => {
    let props;
    beforeEach(() => {
        props = {
            title: 'Tytuł karty',
            movie: './ścieżka_do_pliku.png',
            children: <div></div>,
            onPrevClick: () => {},
            onNextClick: () => {}
        }
    });

    it('should render without crashing', () => {
        const { container } = render(
            <CVEditorTab {...props} />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render generate button when onNextClick is undefined', () => {
        props.onNextClick = undefined;
        const { getByText, queryByText } = render(
            <CVEditorTab {...props} />
        );

        expect(getByText('Generuj CV')).toBeInTheDocument();
        expect(queryByText('Dalej', { exact: false })).not.toBeInTheDocument();
    });

    it('should render disabled back button when onPrevClick is undefined', () => {
        props.onPrevClick = undefined;
        const { getByText } = render(
            <CVEditorTab {...props} />
        );

        expect(getByText('Wstecz', { exact: false })).toBeInTheDocument();
        expect(getByText('Wstecz', { exact: false })).toBeDisabled();
    });

    it('should call onNextClick function when next button is clicked', () => {
        props.onNextClick = jest.fn();
        const { getByText } = render(
            <CVEditorTab {...props} />
        );

        fireEvent.click(getByText('Dalej', { exact: false }));
        expect(props.onNextClick).toHaveBeenCalledTimes(1);
    });

    it('should call onPrevClick function when back button is clicked', () => {
        props.onPrevClick = jest.fn();
        const { getByText } = render(
            <CVEditorTab {...props} />
        );

        fireEvent.click(getByText('Wstecz', { exact: false }));
        expect(props.onPrevClick).toHaveBeenCalledTimes(1);
    });
});
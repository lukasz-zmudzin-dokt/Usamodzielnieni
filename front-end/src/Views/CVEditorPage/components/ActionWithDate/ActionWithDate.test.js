import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ActionWithDate from './ActionWithDate';

describe('ActionWithDate', () => {
    let props;
    beforeEach(() => {
        props = {
            data: [],
            onChange: () => {}
        }
    });

    it('should render without crashing', () => {
        const { container } = render(
            <ActionWithDate {...props} />
        );

        expect(container).toMatchSnapshot();
    });

    it('should call onChange function when text input value change', async () => {
        const { getByLabelText } = render(
            <ActionWithDate {...props} />
        );

        fireEvent.change(
            getByLabelText("Miejsce", { exact: false }), 
            { target: { value: "Warszawa" } }
        );
        fireEvent.change(
            getByLabelText("Opis", { exact: false }), 
            { target: { value: "Jakiś opis" } }
        );
        expect(getByLabelText("Miejsce", { exact: false }).value).toBe("Warszawa");
        expect(getByLabelText("Opis", { exact: false }).value).toBe("Jakiś opis");
    });

    it('should change value when date input value change', async () => {
        const { getByLabelText } = render(
            <ActionWithDate {...props} />
        );

        fireEvent.change(
            getByLabelText("Od", { exact: false }), 
            { target: { value: new Date("October 13, 2020 00:00:00") } }
        );
        fireEvent.change(
            getByLabelText("Do", { exact: false }), 
            { target: { value: new Date("October 15, 2021 00:00:00") } }
        );
        expect(getByLabelText("Od", { exact: false }).value).toBe("10.2020");
        expect(getByLabelText("Do", { exact: false }).value).toBe("10.2021");
    });

    it('should clear inputs when add buttons is clicked', async () => {
        const { getByLabelText, getByText } = render(
            <ActionWithDate {...props} />
        );

        fireEvent.change(
            getByLabelText("Od", { exact: false }), 
            { target: { value: new Date("October 13, 2020 00:00:00") } }
        );
        fireEvent.change(
            getByLabelText("Do", { exact: false }), 
            { target: { value: new Date("October 15, 2021 00:00:00") } }
        );
        fireEvent.change(
            getByLabelText("Miejsce", { exact: false }), 
            { target: { value: "Warszawa" } }
        );
        fireEvent.change(
            getByLabelText("Opis", { exact: false }), 
            { target: { value: "Jakiś opis" } }
        );
        fireEvent.click(getByText('Dodaj', { exact: false }));
        
        expect(getByLabelText("Od", { exact: false }).value).toBe("");
        expect(getByLabelText("Do", { exact: false }).value).toBe("");
        expect(getByLabelText("Miejsce", { exact: false }).value).toBe("");
        expect(getByLabelText("Opis", { exact: false }).value).toBe("");
    });

});

describe('ActionWithDate - integration', () => {
    let props;
    beforeEach(() => {
        props = {
            data: [
                {
                    startTime: new Date(2020, 1, 1),
                    endTime: new Date(2020, 11, 1),
                    place: 'Warszawa',
                    description: 'Jakiś opis'
                }
            ],
            onChange: () => {}
        }
    });

    it('should add action item to list', () => {
        const { getByText } = render(
            <ActionWithDate {...props} />
        );

        expect(getByText('Jakiś opis od:', { exact: false })).toMatchSnapshot();
    })

    it('should add action item to list when endTime is undefined', () => {
        props.data[0].endTime = undefined;

        const { getByText } = render(
            <ActionWithDate {...props} />
        );

        expect(getByText('Jakiś opis od:', { exact: false })).toMatchSnapshot();
    })
});
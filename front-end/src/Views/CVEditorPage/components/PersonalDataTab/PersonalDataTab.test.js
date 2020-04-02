import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonalDataTab from './PersonalDataTab';

jest.mock('../', () => ({ CVEditorTab: ({children}) => children }))

describe('PersonalDataTab', () => {
    let props;
    beforeEach(() => {
        props = {
            data: {
                firstName: "Jan",
                lastName: "Kowalski",
                birthDate: new Date(2020, 3, 13),
                phoneNumber: "+48123123123",
                email: "abc@abc.com"
            },
            onChange: () => {}
        }
    });

    it('should render without crashing', () => {
        const { container } = render(
            <PersonalDataTab {...props} />
        );

        expect(container).toMatchSnapshot();
    });
    it('should not render when data is null', () => {
        props.data = null
        const { queryByText } = render(
            <PersonalDataTab {...props} />
        );

        expect(queryByText('Imię:')).not.toBeInTheDocument();
    });

    it('should call onChange function when text input value change', async () => {
        props.onChange = jest.fn();
        const { getByLabelText } = render(
            <PersonalDataTab {...props} />
        );

        fireEvent.change(
            getByLabelText("Imię", { exact: false }), 
            { target: { value: "Adam" } }
        );
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenNthCalledWith(1, {
            firstName: "Adam",
            lastName: "Kowalski",
            birthDate: new Date(2020, 3, 13),
            phoneNumber: "+48123123123",
            email: "abc@abc.com"
        });
    });

    it('should call onChange function when date input value change', async () => {
        props.onChange = jest.fn();
        const { getByLabelText } = render(
            <PersonalDataTab {...props} />
        );

        fireEvent.change(
            getByLabelText("Data urodzenia", { exact: false }), 
            { target: { value: new Date("October 13, 2020 00:00:00") } }
        );
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenNthCalledWith(1, {
            firstName: "Jan",
            lastName: "Kowalski",
            birthDate: new Date(2020, 9, 13),
            phoneNumber: "+48123123123",
            email: "abc@abc.com"
        });
    });
});
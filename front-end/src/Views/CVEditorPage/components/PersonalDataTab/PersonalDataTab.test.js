import React from 'react';
import { render } from '@testing-library/react';
import PersonalDataTab from './PersonalDataTab';

jest.mock('../', () => ({ CVEditorTab: ({children}) => children }))

describe('PersonalDataTab', () => {
    let props;
    beforeEach(() => {
        props = {
            data: {
                firstName: "Jan",
                lastName: "Kowalski",
                birthDate: new Date(),
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
});
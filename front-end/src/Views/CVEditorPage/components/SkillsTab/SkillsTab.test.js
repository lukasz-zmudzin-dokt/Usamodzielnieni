import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SkillsTab from './SkillsTab';

describe('SkillsTab', () => {
    let props;
    beforeEach(() => {
        props = {
            data: [],
            onChange: () => {}
        }
    });

    it('should render without crashing', () => {
        const { container } = render(
            <SkillsTab {...props} />
        );

        expect(container).toMatchSnapshot();
    });

    it('should call onNameChange function when text input value change', async () => {
        props.onChange = jest.fn();
        const { getByLabelText } = render(
            <SkillsTab {...props} />
        );

        fireEvent.change(
            getByLabelText("Umiejętność", { exact: false }), 
            { target: { value: "Nazwa umiejętności" } }
        );
        expect(getByLabelText("Umiejętność", { exact: false }).value).toBe("Nazwa umiejętności");
    });
});
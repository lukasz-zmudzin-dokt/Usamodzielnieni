import React from 'react';
import { render } from '@testing-library/react';
import EducationTab from './EducationTab';

describe('EducationTab', () => {
    let props;
    beforeEach(() => {
        props = {
            data: [], 
            onChange: () => {}
        }
    });

    it('should render without crashing', () => {
        const { container } = render(
            <EducationTab {...props} />
        );

        expect(container).toMatchSnapshot();
    });
});
import React from 'react';
import { render } from '@testing-library/react';
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
});
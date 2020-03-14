import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { MemoryRouter } from 'react-router-dom';

describe('Notifications', () => {
    it('should render without crashing', () => {

        const { container } = render(
            <MemoryRouter>
                <Notifications />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it('should open notifications list when toggle is clicked', async () => {

        const { container, getByText } = render(
            <MemoryRouter>
                <Notifications />
            </MemoryRouter>
        );
        fireEvent.click(getByText('Powiadomienia', { exact: false }));

        await expect(container).toMatchSnapshot();
    });
});
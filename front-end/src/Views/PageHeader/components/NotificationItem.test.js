import React from "react";
import { render } from "@testing-library/react";
import NotificationItem from "./NotificationItem";
import { MemoryRouter } from 'react-router-dom';

describe('NotificationItem', () => {
    it('should render without crashing', () => {
        const notification = {
            id: 1,
            path: '/',
            title: 'Tytuł powiadomienia',
            time: new Date(1584207570892)
        }

        const { container } = render(
            <MemoryRouter>
                <NotificationItem notification={notification} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});
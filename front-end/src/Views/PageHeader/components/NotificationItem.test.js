import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
        const onClick = id => {};

        const { container } = render(
            <MemoryRouter>
                <NotificationItem notification={notification} onClick={onClick}/>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it('should call function when button is clicked', async () => {
        const notification = {
            id: 'id_123',
            path: '/',
            title: 'Tytuł powiadomienia',
            time: new Date(1584207570892)
        }
        const onClick = jest.fn();

        const { getByText } = render(
            <MemoryRouter>
                <NotificationItem notification={notification} onClick={onClick}/>
            </MemoryRouter>
        );
        fireEvent.click(getByText('X'));

        await expect(onClick).toHaveBeenCalledWith('id_123');
    });
});
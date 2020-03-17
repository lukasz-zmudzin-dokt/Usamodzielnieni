import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotificationItemContainer from "./NotificationItemContainer";

describe('NotificationItemContainer', () => {
    it('should render without crashing', () => {
        const notification = {
            id: 1,
            path: '/',
            title: 'Tytuł powiadomienia',
            time: new Date(1584207570892)
        }
        const onClick = id => {};

        const { container } = render(
            <NotificationItemContainer notification={notification} onClick={onClick}/>
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
            <NotificationItemContainer notification={notification} onClick={onClick}/>
        );
        fireEvent.click(getByText('X'));

        await expect(onClick).toHaveBeenCalledWith('id_123');
    });
});
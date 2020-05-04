import React from "react";
import { render } from "@testing-library/react";
import ChatInfo from "./ChatInfo";
import { MemoryRouter } from 'react-router-dom';

jest.mock('components', () => ({
    UserPicture: () => <div>UserPicture</div>
}));

describe('ChatInfo', () => {
    it('should render without crashing', () => {
        const chat = {
            id: "123",
            name: "Nazwa chatu",
            user: {}
        };

        const { container } = render(
            <MemoryRouter>
                <ChatInfo chat={chat} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});
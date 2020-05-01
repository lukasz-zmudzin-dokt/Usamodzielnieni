import React from "react";
import { render } from "@testing-library/react";
import ChatInfo from "./ChatInfo";
import { MemoryRouter } from 'react-router-dom';

describe('ChatInfo', () => {
    it('should render without crashing', () => {
        const chat = {
            id: "123",
            name: "Nazwa chatu"
        };

        const { container } = render(
            <MemoryRouter>
                <ChatInfo chat={chat} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});
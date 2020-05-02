import React from "react";
import { render, waitForElement } from "@testing-library/react";
import RemoveOffer from "./RemoveOffer";

let mock_apiError = false;
jest.mock('../../functions/deleteOffer', () => ({ 
    deleteOffer: (id, token) => {
        if (mock_apiError) {
            throw Error('err');
        }
        return;
    }
}));

describe('RemoveOffer', () => {
    let props;

    beforeAll(() => {
        props = {
            id: '123',
            user: { token: 'abc' }
        };
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', () => {
        const { container } = render(<RemoveOffer {...props}/>);

        expect(container).toMatchSnapshot();
    });

});
import React from "react";
import { render } from "@testing-library/react";
import { AlertsContainer,AlertMessage } from "components";
import {AlertContext} from 'context';

jest.mock('../AlertMessage');

describe("AlertMessage", () => {
    let alertC = {
        open: true
    }
    AlertMessage.mockImplementation(() => <div>AlertMock</div>);
    it("should match snapshot(open = true)", () => {
        const { container } = render(<AlertContext.Provider value={alertC}><AlertsContainer /></AlertContext.Provider>);
        expect(container).toMatchSnapshot();
    });

    it("should match snapshot(open = false)", () => {
        alertC = {
            open: false
        }
        const { container } = render(<AlertContext.Provider value={alertC}><AlertsContainer /></AlertContext.Provider>);
        expect(container).toMatchSnapshot();
    });
});

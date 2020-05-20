import React from "react";
import {render} from "@testing-library/react";
import {renderWithTimeout} from "./renderWithTimeout";

describe('renderWithTimeout', () => {
    let component, timeout;

    beforeEach(() => {
        component = jest.fn().mockImplementation(() => {
            return <div>środek komponentu</div>
        });
        timeout = 10000;
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    it('should render component', () => {
        const {container} = render(
            renderWithTimeout(component, timeout)
        );

        expect(container).toMatchSnapshot();
    });

    it('should hide component after certain time', () => {
        timeout = 10000;
        const {getByText, queryByText} = render(
            renderWithTimeout(component, timeout)
        );

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(getByText("środek komponentu")).toBeInTheDocument();

        jest.runAllTimers();

        expect(queryByText("środek komponentu")).not.toBeInTheDocument();
    });
});
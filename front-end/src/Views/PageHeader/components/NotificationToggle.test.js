import React from "react";
import { render } from "@testing-library/react";
import NotificationToggle from "./NotificationToggle"

describe('NotificationToggle', () => {
    it('should render without crashing', () => {
        const { container } = render(<NotificationToggle count={2} />);

        expect(container).toMatchSnapshot();
    });

    it('should render badge when count is greater than 0', () => {
        const count = 2;

        const { getByText } = render(<NotificationToggle count={count} />);
        const badge = getByText(`${count}`)

        expect(badge).toMatchSnapshot();
    });

    it('should not render badge when count is equal 0', () => {
        const count = 0;

        const { queryByText } = render(<NotificationToggle count={count} />);

        expect(queryByText(`${count}`)).not.toBeInTheDocument();
    });
});
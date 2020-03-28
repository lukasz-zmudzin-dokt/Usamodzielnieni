import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import ItemsList from './ItemsList';

jest.mock('../', () => ({ Items: () => <div>Items</div> }))

describe('ItemsList', () => {
    let props;
    beforeEach(() => {
        props = {
            data: [], 
            getItem: () => {},
            getItemId: () => {},
            getItemName: () => {},
            onChange: () => {},
            clear: () => {},
            children: <div></div>
        }
    });

    it('should render without crashing', () => {
        const { container } = render(
            <ItemsList {...props} />
        );

        expect(container).toMatchSnapshot();
    });
    
    it('should not render items when data array is empty', () => {
        const { queryByText } = render(
            <ItemsList {...props} />
        );

        expect(queryByText('Items')).not.toBeInTheDocument();
    });

    it('should render items when data array is not empty', () => {
        props.data = ['item'];
        const { getByText } = render(
            <ItemsList {...props} />
        );

        expect(getByText('Items')).toBeInTheDocument();
    });

    it('should add item when add button is clicked and form is valid', async () => {
        props = {
            data: ['item'], 
            getItem: () => 'item2',
            getItemId: (item) => item,
            onChange: jest.fn(),
            clear: jest.fn()
        }
        const { getByText, queryByText } = render(
            <ItemsList {...props} />
        );

        await waitForElement(() => getByText('Dodaj', { exact: false }));
        expect(props.onChange).toHaveBeenCalledTimes(1);
        fireEvent.click(getByText('Dodaj', { exact: false }));
        expect(props.onChange).toHaveBeenCalledTimes(2);
        expect(props.clear).toHaveBeenCalledTimes(1);
        expect(queryByText('Taka sama pozycja', { exact: false })).not.toBeInTheDocument();
    });
    
    it('should not add item and display error alert when add button is clicked and form is invalid', async () => {
        props = {
            data: ['item'], 
            getItem: () => 'item',
            getItemId: (item) => item,
            onChange: jest.fn(),
            clear: jest.fn()
        }
        const { getByText } = render(
            <ItemsList {...props} />
        );

        await waitForElement(() => getByText('Dodaj', { exact: false }));
        expect(props.onChange).toHaveBeenCalledTimes(1);
        fireEvent.click(getByText('Dodaj', { exact: false }));
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.clear).toHaveBeenCalledTimes(0);
        expect(getByText('Taka sama pozycja', { exact: false })).toBeInTheDocument();
    });
});
import React from "react";
import {render, fireEvent} from "@testing-library/react"
import ChatForm from "./ChatForm";

describe('chat form tests', () => {
    let props = {
        sendMessage: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', () => {
        const {container} = render(<ChatForm {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('should call send message method and clear input value on send click', () => {
        const {getByDisplayValue, getByText} = render(<ChatForm {...props} />);
        const button = getByText('Wyślij');
        const input = getByDisplayValue('');
        
        fireEvent.change(input, {target: {value: 'test message'}});
        fireEvent.click(button);
        
        expect(props.sendMessage).toHaveBeenCalledWith('test message');
        expect(input.value).toBe('');
    });
    
    it('should not call send message method when input is empty', () => {
        const {getByDisplayValue, getByText} = render(<ChatForm {...props} />);
        const button = getByText('Wyślij');
        const input = getByDisplayValue('');
        
        fireEvent.change(input, {target: {value: ''}});
        fireEvent.click(button);
        
        expect(props.sendMessage).not.toHaveBeenCalled();
    });

});
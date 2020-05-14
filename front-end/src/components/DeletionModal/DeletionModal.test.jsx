import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DeletionModal from "./DeletionModal";

describe('deletion modal tests', () => {
    let props;

    beforeAll(() => {
        props = {
            show: true,
            setShow: jest.fn(),
            delConfirmed: jest.fn(),
            question: 'Do you want to delete this element?',
            confirmLabel: 'Yes',
            cancelLabel: 'No'
        };
    });

    it('should display default labels', () => {
        const {getByText} = render(DeletionModal(true));
        expect(getByText('Usuń ✗')).toBeInTheDocument();
        expect(getByText('Zostaw')).toBeInTheDocument();
    });

    it('should display correct labels', () => {
        const {getByText} = render(DeletionModal(true, props.setShow, props.delConfirmed, props.question, props.confirmLabel, props.cancelLabel));
        expect(getByText(props.confirmLabel)).toBeInTheDocument();
        expect(getByText(props.cancelLabel)).toBeInTheDocument();
        expect(getByText(props.question)).toBeInTheDocument();
    });

    it('should call setshow with false when cancel button clicked', () => {
        const {getByText} = render(DeletionModal(true, props.setShow, props.delConfirmed, props.question, props.confirmLabel, props.cancelLabel));
        const cancel = getByText(props.cancelLabel);
        fireEvent.click(cancel);
        expect(props.setShow).toHaveBeenCalledWith(false);
    });

    it('should call setshow with false and delConfirm with true when confirm button clicked', () => {
        const {getByText} = render(DeletionModal(true, props.setShow, props.delConfirmed, props.question, props.confirmLabel, props.cancelLabel));
        const confirm = getByText(props.confirmLabel);
        fireEvent.click(confirm);
        expect(props.setShow).toHaveBeenCalledWith(false);
        expect(props.delConfirmed).toHaveBeenCalledWith(true);
    });
    
});
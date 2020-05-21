import StepCard from "./StepCard";
import React from "react";
import {render, fireEvent} from "@testing-library/react";

describe("StepCardTest", () => {
    let setCurrent, step;
    beforeEach(() => {
        step = {
            id: "2",
            type: "main",
            title:
                "Tytuł głównego kroku 2 123 123",
            description: "Opis kroku 2 wraz z filmikami.",
            video: "rickrolltylkozahaszowany",
            next: [{ id: "3", choiceName: "Dalej" }],
        };
        setCurrent = jest.fn();
    });

    it('should match snapshot', () => {
        const {container} = render(
            <StepCard step={step} setCurrent={setCurrent} />
        );

        expect(container).toMatchSnapshot();
    });

    it('should call setCurrent with right params', () => {
        const {getByText} = render(
            <StepCard step={step} setCurrent={setCurrent} />
        );

        fireEvent.click(getByText("Dalej"));
        const id = step.next.find(child => child.choiceName === "Dalej").id;

        expect(setCurrent).toHaveBeenCalledWith(id);
    });

});
import React from "react";
import {fireEvent, render} from '@testing-library/react';
import SelectionRow from "./SelectionRow";
import {waitForElement} from "@testing-library/dom";

describe('SelectionRow', () => {
    let nameTags, nameCats, arrayTypeTags, arrayTypeCats, onChange, currentTag, currentCat, onCut;

    beforeEach(() => {
        nameTags = 'tags';
        nameCats = 'category';
        arrayTypeTags = ['tag1', 'tag2'];
        arrayTypeCats = ['kategoria1', 'kategoria2'];
        onChange = jest.fn().mockImplementation((e) => [e.target.name] = e.target.value);
        currentTag = [arrayTypeTags[0]];
        currentCat = arrayTypeCats[0];
        onCut = jest.fn();
    });

    it('should render correctly', () => {
        const {container} = render(
            <SelectionRow
                name={nameCats}
                arrayType={arrayTypeCats}
                onChange={onChange}
                current={currentCat}
                onCut={onCut}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should call onChange with category', () => {

        const {queryByText, getByPlaceholderText} = render(
            <SelectionRow
                name={nameCats}
                arrayType={arrayTypeCats}
                onChange={onChange}
                current={currentCat}
                onCut={onCut}
            />
        );
        expect(queryByText('Kategoria: kategoria1')).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText('Wpisz nową kategorię', {exact: false}), {
            target: {value: 'cat3'}
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should render empty tag list', () => {
        const {queryByTestId} = render(
            <SelectionRow
                name={nameTags}
                arrayType={arrayTypeTags}
                onChange={onChange}
                current={[]}
                onCut={onCut}
            />
        );

        expect(queryByTestId('buttonList')).not.toBeInTheDocument();
    });

    it('should call onChange with tag', () => {
        const {getByPlaceholderText} = render(
            <SelectionRow
                name={nameTags}
                arrayType={arrayTypeTags}
                onChange={onChange}
                current={currentTag}
                onCut={onCut}
            />
        );

        expect(currentTag.length).toBe(1);
        fireEvent.change(getByPlaceholderText('Dodaj nowy tag', {exact: false}), {
            target: {value: 'tag3'}
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
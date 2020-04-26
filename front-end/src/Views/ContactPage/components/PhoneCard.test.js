import React, {useState} from "react";
import { render } from "@testing-library/react";
import PhoneCard from "./PhoneCard";
import {copyToClipboard} from "./PhoneCard"

describe("PhoneCard", () => {

    const contact = {
        name: "abc_name",
        number: "123456789"
    }

    it("should render without crashing", () => {
        const { getByText } = render(
            <PhoneCard name={contact.name} number={contact.number} />
        );
        expect(getByText("abc_name", { exact: false })).toBeInTheDocument();
        expect(getByText("123456789", { exact: false })).toBeInTheDocument();
    });

    it("should match snapshot", async () => {
        const { container } = render(
            <PhoneCard />
        );
        expect(container).toMatchSnapshot();
    });
});

describe("copyToClipboard", () => {
    beforeAll(() => {
        global.document.execCommand = function execCommandMock() { };
      });

    const test_text = "testowytekst";
    
    let copied = true;
    const setCopied = (val) =>{
        copied = val;
    } 

    it("should copy given text", () => {
        document.execCommand = jest.fn()
        copyToClipboard(test_text, setCopied);
        expect(document.execCommand).toHaveBeenCalledWith("copy");
        //expect(navigator.clipboard.readText()).toBe("testowytekst");
    });
});
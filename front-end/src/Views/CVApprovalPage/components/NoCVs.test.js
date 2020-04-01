import React from "react";
import { render } from "@testing-library/react";
import NoCVs from "./NoCVs";

describe("NoCVs", () => {
    test("should match with snapshot 1", () => {
        const { profile1 } = render ( <NoCVs cvs={[{id: 0}]} /> );
        expect(profile1).toMatchSnapshot();
    });
    test("should match with snapshot 2", () => {
        const { profile2 } = render ( <NoCVs cvs={undefined} /> );
        expect(profile2).toMatchSnapshot();
    });
    test("should match with snapshot 3", () => {
        const { profile3 } = render ( <NoCVs cvs={[]} /> );
        expect(profile3).toMatchSnapshot();
    });
});
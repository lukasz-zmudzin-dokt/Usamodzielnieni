import React from "react";
import { render } from "@testing-library/react";
import CVLegend from "./CVLegend";

describe("CVApproval", () => {
    test("should match with snapshot", () => {
        const { profile } = render ( <CVLegend cvs={[{id: 0}]} /> );
        expect(profile).toMatchSnapshot();
    });

});
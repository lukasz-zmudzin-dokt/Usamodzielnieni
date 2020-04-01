import React from "react";
import { render } from "@testing-library/react";
import InterestedPerson from "./InterestedPerson";

describe("InterestedPerson", () => {
    test("should look like snapshot", () => {
        const { profile } = render(<InterestedPerson person={{id: 0, firstName: 'a', lastName: 'b', email: 'c'}}/>);
        expect(profile).toMatchSnapshot();
    });
});
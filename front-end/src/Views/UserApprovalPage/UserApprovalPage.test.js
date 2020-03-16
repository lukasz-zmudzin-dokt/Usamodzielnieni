import React from "react";
import { render } from "@testing-library/react";
import UserApprovalPage from "./UserApprovalPage";
import renderer from "react-test-renderer";

describe("UserApproval", () => {
    it("should render without crashing", () => {
        render(<UserApprovalPage />);
    });
    it("should look like snapshot", () => {
        const profile = renderer.create(<UserApprovalPage />).toJSON();
        expect(profile).toMatchSnapshot();
    });
});
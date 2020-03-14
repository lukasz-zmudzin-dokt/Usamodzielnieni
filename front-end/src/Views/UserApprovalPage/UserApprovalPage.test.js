import React from "react";
import { render } from "@testing-library/react";
import UserApprovalPage from "./UserApprovalPage";

describe("UserApproval", () => {
    it("should render without crashing", () => {
        render(<UserApprovalPage />);
    });

});
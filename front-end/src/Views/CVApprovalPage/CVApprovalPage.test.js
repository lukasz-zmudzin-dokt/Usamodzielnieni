import React from "react";
import { render } from "@testing-library/react";
import CVApprovalPage from "./CVApprovalPage";

describe("CVApproval", () => {
  it("should render without crashing", () => {
      render(<CVApprovalPage />);
  });


});